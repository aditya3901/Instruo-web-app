const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        unique: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
    },
    round: {
        type: String,
        default: "1",
    },
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    leader : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    avatar: String
});

teamSchema.pre(/^find/, function (next) {
    this.populate({
      path: "participants",
      select: "-__v -events",
    });
  
    next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;