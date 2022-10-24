const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Team = require("../models/teamModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.registerIndividual = asyncHandler(async (req, res, next) => {
    const event = await Event.find({ eventId: req.params.event });
    if (!event) {
        return next(new AppError("Event Does Not Exist", 404));
    }

    const participant = await User.findById(req.params.participant);
    if (!participant) {
        return next(new AppError("Participant Does Not Exist", 404));
    }

    Team.forEach(team => {
        if (team.leader == participant) {
            return next(new AppError("Participant Already Registered", 409));
        }
    });

    const team = await Team.create(req.body);
    
    res.status(201).json({
        status: "success",
        data: team,
        message: "Registration Successful",
    });
});

exports.createTeam = asyncHandler(async (req, res, next) => {
    const event = await Event.find({ eventId: req.params.event });
    if (!event) {
        return next(new AppError("Event Does Not Exist", 404));
    }

    const leader = await User.findById(req.params.leader);
    if (!leader) {
        return next(new AppError("Participant Does Not Exist", 404));
    }

    Team.forEach(team => {
        if (team.leader == leader) {
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        team.participants.forEach(participant => {
            if (participant == leader) {
                return next(new AppError("Participant Already Member Of Another Team", 409));
            }
        });
    });

    const { name, avatar } = req.body;
    
    if (!name) {
        return next(new AppError("Team Name Required", 400));
    }

    if (!avatar) {
        return next(new AppError("Team Avatar Required", 400));
    }
    
    const team = await Team.create(req.body);
    
    res.status(201).json({
        status: "success",
        data: team,
        message: "Registration Successful"
    });
});

exports.addMember = asyncHandler(async (req, res, next) => {
    const memberId  = req.body;
    const event = await Event.find({ eventId: req.params.event });
    if (!event) {
        return next(new AppError("Event Does Not Exist", 404));
    }

    const team = await Team.find({ teamId: req.params.teamId });
    if (!team) {
        return next(new AppError("Team Does Not Exist", 404));
    }

    const member = await User.findById(memberId);
    if (!member) {
        return next(new AppError("Participant Does Not Exist", 404));
    }

    Team.forEach(team => {
        if (team.leader == member) {
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        team.participants.forEach(participant => {
            if (participant == member) {
                return next(new AppError("Participant Already Member Of Another Team", 409));
            }
        });
    });

    team.participants.push(memberId);
    team.save();

    res.status(201).json({
        status: "success",
        message: "Registration Successful",
    });
});

exports.promoteTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.find({ teamId: req.params.teamId });
    if (!team) {
        return next(new AppError("Team Does Not Exist", 404));
    }

    const round = req.body.round;
    team.round = round;
    team.save();

    res.status(201).json({
        status: "success",
        message: "Promotion Successful",
    });
});