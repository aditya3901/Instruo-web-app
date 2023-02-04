const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Workshop = require("../models/workshopModel");
const User = require("../models/userModel");

exports.createWorkshop = asyncHandler(async (req, res, next) => {
  const workshop = await Workshop.create(req.body);

  const count = await Workshop.countDocuments();
  workshop.workshopId = `${count}`;
  await workshop.save();

  res.status(200).json({
    status: "success",
    workshop,
  });
});

exports.getAllWorkshops = asyncHandler(async (req, res, next) => {
  const workshops = await Workshop.find({});

  res.status(200).json({
    status: "success",
    workshops,
  });
});

exports.getWorkshopById = asyncHandler(async (req, res, next) => {
  const workshop = await Workshop.findOne({ workshopId: req.params.id });
  if (!workshop) {
    return next(new AppError("Workshop Does Not Exist", 404));
  }

  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(200).json({
      status: "success",
      data: {
        workshop,
      },
    });
  }

  var isRegistered = false;
  workshop.participants.forEach((id) => {
    if (id.toString() == userId) {
      isRegistered = true;
      return false;
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      isRegistered,
      workshop,
    },
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const { workshopId, participantId } = req.body;

  const workshop = await Workshop.findOne({ workshopId: workshopId });
  if (!workshop) {
    return next(new AppError("Workshop Does Not Exist", 404));
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return next(new AppError("Participant Does Not Exist", 404));
  }

  workshop.participants.push(participant._id);
  await workshop.save();

  participant.workshops.push(workshop._id);
  await participant.save();

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
  });
});
