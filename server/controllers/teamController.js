const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Team = require("../models/teamModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.createTeam = asyncHandler(async (req, res, next) => {
    const event = await Event.find({ eventId: req.params.event });
    if (!event) {
        return next(new AppError("Event Does Not Exist", 404));
    }

    const leader = await User.findById(req.params.leader);
    if (!participant) {
        return next(new AppError("Participant Does Not Exist", 404));
    }

    Team.forEach(team => {
        if (team.leader == leader) {
            return next(new AppError("Team Exists For User", 404));
        }
    });

    const team = await Team.create(req.body);
    
    res.status(201).json({
        status: "success",
        data: team,
    });
});

exports.addMember = asyncHandler(async (req, res, next) => {
    const memberId  = req.body;
    const event = await Event.find({ eventId: req.params.event });
    if (!event) {
        return next(new AppError("Event Does Not Exist", 404));
    }

    const team = await Team.find({ teamId: req.params.team });
    if (!event) {
        return next(new AppError("Team Does Not Exist", 404));
    }

    const member = await User.findById(memberId);
    if (!member) {
        return next(new AppError("Participant Does Not Exist", 404));
    }

    Team.forEach(team => {
        if (team.leader == member) {
            return next(new AppError("Participant Already Part Of Another Team", 404));
        }

        team.participants.forEach(participant => {
            if (participant == member) {
                return next(new AppError("Participant Already Part Of Another Team", 404));
            }
        });
    });

    team.participants.push(memberId);
    await team.save();
});