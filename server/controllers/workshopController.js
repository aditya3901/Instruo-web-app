const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Workshop = require("../models/workshopModel");

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

  res.status(200).json({
    status: "success",
    data: {
      workshop,
    },
  });
});
