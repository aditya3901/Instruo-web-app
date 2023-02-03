const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Email = require("../utils/email");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  // Don't show user password in res
  user.password = undefined;

  // .cookie("access_token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  // })
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});

exports.uploadImage = upload.single("image");

exports.signup = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    return next(new AppError("User already exist", 400));
  }

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  const result = await cloudinary.uploader.upload(req.file.path);

  const user = await User.create(req.body);
  user.photo = result.secure_url;
  await user.save();

  createSendToken(user, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  await user.populate({
    path: "events.eventId",
    select: "-participants -teams",
  });

  await user.populate({
    path: "events.teamId",
  });

  // Send token to client
  createSendToken(user, 200, res);
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User doesn't exist!", 404));
  }

  await user.populate({
    path: "events.eventId",
    select: "-participants -teams",
  });

  await user.populate({
    path: "events.teamId",
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access.", 401)
    );
  }

  // Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("Not authorised, invalid token", 401));
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User changed password after jwt was issued! Please login again",
        401
      )
    );
  }

  // Grant Access To Protected Route
  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    return next(
      new AppError("You don't have permission to perform this action.", 403)
    );
  };

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User not found for given email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(err);

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();

  createSendToken(user, 200, res);
});
