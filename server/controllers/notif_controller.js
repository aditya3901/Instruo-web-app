const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification_model");

exports.createNotif = asyncHandler(async (req, res, next) => {
  const notif = await Notification.create(req.body);

  res.status(200).json({
    status: "success",
    notif,
  });
});

exports.getMyNotifs = asyncHandler(async (req, res, next) => {
  const { id } = req.params.id;

  const notifs = await Notification.find({ target_user_id: id.toString() });

  res.status(200).json({
    status: "success",
    notifs,
  });
});
