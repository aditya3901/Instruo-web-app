const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    eventId: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Event",
    },
    teamName: {
        type: String,
    },
    round: {
        type: String,
        default: "1",
    },
    participantIds: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    leaderId : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    avatar: String
});

teamSchema.pre(/^find/, function (next) {
    this.populate({
      path: "participantIds",
    });
    
    this.populate({
        path: "leaderId",
    })

    this.populate({
        path: "eventId",
    })
  
    next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;