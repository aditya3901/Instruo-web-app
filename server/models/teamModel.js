const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    eventId: {
        required: true,
        type: String,
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
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    avatar: String
});

teamSchema.pre(/^find/, function (next) {
    this.populate({
        path: "participantIds",
        select:
            "-__v -events -passwordChangedAt -passwordResetToken -passwordResetExpired",
    });
    
    this.populate({
        path: "leaderId",
        select:
            "-__v -events -passwordChangedAt -passwordResetToken -passwordResetExpired",
    });

    next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;