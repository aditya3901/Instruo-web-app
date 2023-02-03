const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  title: String,
  desc: String,
  from: {
    name: String,
    image: String,
  },
  created_at: Date,
  eventId: String,
});

const Notification = mongoose.model("Notif", notifSchema);

module.exports = Notification;
