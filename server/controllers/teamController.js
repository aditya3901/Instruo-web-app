const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Team = require("../models/teamModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.getAllTeamsByEvent = asyncHandler(async (req, res, next) => {
    const teams = await Team.find({eventTitle: req.event.title});

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
    const eventTitle = req.params.event;
    var canRegister = true;

    const teams = await Team.find({});

    teams.forEach(team => {
        if (team.leader.id == participant.id && team.eventTitle == eventTitle) {
            canRegister = false;
            return next(new AppError("Participant Already Registered", 409));
        }
    });

    if (canRegister) {
        const team = await Team.create(req.body);
    
        res.status(201).json({
            status: "success",
            data: team,
            message: "Registration Successful",
        });
    }
});

exports.createTeam = asyncHandler(async (req, res, next) => {
    const leader = await User.findById(req.params.leaderId);
    const eventTitle = req.params.title;
    var canCreate = true;
    const teams = await Team.find({});

    teams.forEach(team => {
        if (team.leader.id == leader.id && team.eventTitle == eventTitle) {
            
            canCreate = false;
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        if (team.participantIds != null) {
            team.participantIds.forEach(participant => {
                if (participant.id == leader.id && team.eventTitle == eventTitle) {
                    canCreate = false;
                    return next(new AppError("Participant Already Member Of Another Team", 409));
                }
            });
        }
    });

    const { teamName, avatar } = req.body;
    
    if (!teamName) {
        canCreate = false;
        return next(new AppError("Team Name Required", 400));
    }

    if (!avatar) {
        canCreate = false;
        return next(new AppError("Team Avatar Required", 400));
    }
    
    if (canCreate) {
        const team = await Team.create(req.body);
        res.status(201).json({
            status: "success",
            data: team,
            message: "Registration Successful"
        });
    }
    
    
    
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
    if (req.team.members >= req.event.maxTeamMembers) {
        return next(new AppError("Team Has No Vacancy", 400));
    }

    const memberId = req.body.memberId;
    const eventTitle = req.params.event;
    const member = await User.findById(memberId);
    var canAdd = true;
    const teams = await Team.find({});
    teams.forEach(team => {
        if (team.leader.id == member.id && team.eventTitle == eventTitle) {
            canAdd = false;
            return next(new AppError("Participant Already Leader Of Another Team", 409));
        }

        const participants = team.participants;
        team.participants.every(participant => {
            canAdd = false;
            if (participant.id == member.id && team.eventId == eventTitle) {
                return next(new AppError("Participant Already Member Of Another Team", 409));
            }
        });
    });

    if (canAdd) {
        req.team.participants.push(memberId);
        req.team.members = req.team.members + 1;
        req.team.save();
    }

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