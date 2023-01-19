const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  eventTitle: {
    required: true,
    type: String,
  },
  teamName: {
    type: String,
  },
  college: {
    type: String,
  },
  round: {
    type: String,
    default: "1",
  },
  members: {
    type: Number,
    default: 1,
  },
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  leader: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  avatar: String,
});

teamSchema.pre(/^find/, function (next) {
  this.populate({
    path: "participants",
    select:
      "-__v -events -passwordChangedAt -passwordResetToken -passwordResetExpired",
  });

  this.populate({
    path: "leader",
    select:
      "-__v -events -passwordChangedAt -passwordResetToken -passwordResetExpired",
  });

  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
