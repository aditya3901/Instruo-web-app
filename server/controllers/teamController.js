const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Team = require("../models/teamModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.getAllTeamsByEvent = asyncHandler(async (req, res, next) => {
    const teams = await Team.find({ eventId: req.event.eventId });
    
    res.status(200).json({
        status: "success",
        teams,
    });
});

exports.getAllTeams = asyncHandler(async (req, res, next) => {
    const teams = await Team.find({});
    
    res.status(200).json({
        status: "success",
        teams,
    });
});

exports.registerIndividual = asyncHandler(async (req, res, next) => {
    const participant = await User.findById(req.params.participantId);

    const teams = await Team.find({});

    teams.forEach(team => {
        if (team.leaderId == participant) {
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
    const leader = await User.findById(req.params.leaderId);

    const teams = await Team.find({});

    teams.forEach(team => {
        if (team.leaderId == leader) {
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        team.participantIds.forEach(participant => {
            if (participant == leader) {
                return next(new AppError("Participant Already Member Of Another Team", 409));
            }
        });
    });

    const { teamName, avatar } = req.body;
    
    if (!teamName) {
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

exports.populateTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
        return next(new AppError("Team Does Not Exist", 404));
    }
    
    req.team = team;
    next();
})

exports.addMember = asyncHandler(async (req, res, next) => {
    const memberId = req.body.memberId;
    const member = await User.findById(memberId);

    const teams = await Team.find({});
    teams.forEach(team => {
        if (team.leaderId == member) {
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        team.participantIds.forEach(participant => {
            if (participant == member) {
                return next(new AppError("Participant Already Member Of Another Team", 409));
            }
        });
    });

    req.team.participantIds.push(memberId);
    req.team.save();

    res.status(201).json({
        status: "success",
        message: "Registration Successful",
    });
});

exports.promoteTeam = asyncHandler(async (req, res, next) => {
    const round = req.body.round;
    req.team.round = round;
    req.team.save();

    res.status(201).json({
        status: "success",
        message: "Promotion Successful",
    });
});

exports.updateTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.findByIdAndUpdate(
        req.params.teamId, 
        req.body, 
        {
            new: true,
            runValidators: true
        }
    );
  
    res.status(201).json({
        status: "success",
        data: team,
    });
});