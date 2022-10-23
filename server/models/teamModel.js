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
    round: {
        type: String,
        default: "1",
    },
    isTeam: {
        type: Boolean,
        required: true,
        default: true,
    },
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
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