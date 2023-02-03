const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification_model");

exports.createNotif = asyncHandler(async (req, res, next) => {
  const notif = await Notification.create(req.body);

  res.status(200).json({
    status: "success",
    notif,
  });
});

exports.getNotifs = asyncHandler(async (req, res, next) => {
  const notifs = await Notification.find({});

  res.status(200).json({
    status: "success",
    notifs,
  });
});
