const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Team = require("../models/teamModel");

exports.registerForEvent = asyncHandler(async (req, res, next) => {
  const { eventId, participantId } = req.body;
  const event = await Event.findOne({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return next(new AppError("Participant Does Not Exist", 404));
  }

  event.participants.push(participant._id);
  await event.save();

  participant.events.push({ eventId: event._id });
  await participant.save();

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
  });
});

exports.createTeamForEvent = asyncHandler(async (req, res, next) => {
  const { eventId, participantId, teamName, college } = req.body;
  const event = await Event.findOne({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return next(new AppError("Participant Does Not Exist", 404));
  }

  const team = await Team.create({
    eventId: eventId,
    teamName: teamName,
    college: college,
    leader: participant._id,
  });

  participant.events.push({ eventId: event._id, teamId: team._id });
  await participant.save();

  event.teams.push(team._id);
  await event.save();

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
    eventId,
    teamId: team._id.toString(),
  });
});

exports.joinTeamForEvent = asyncHandler(async (req, res, next) => {
  const { eventId, teamId, participantId } = req.body;

  const event = await Event.findOne({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return next(new AppError("Participant Does Not Exist", 404));
  }

  var flag = -1;
  const team = await Team.findById(teamId);
  if (team) {
    var curLen = team.participants.length + 1;
    if (curLen < event.maxTeamSize) {
      event.teams.forEach(async (id) => {
        if (id == teamId) {
          flag = 0;

          team.participants.push(participant._id);
          participant.events.push({
            eventId: event._id,
            teamId: team._id,
          });
          await participant.save();
          return false;
        }
      });
    }
  }

  await team.save();

  if (flag == 0) {
    res.status(200).json({
      status: "success",
      message: "Registration Successful",
    });
  } else {
    res.status(403).json({
      status: "fail",
      message: "Registration Failed",
    });
  }
});

exports.participantPay = asyncHandler(async (req, res, next) => {
  const { eventId, participantId } = req.params;
  const event = await Event.findById({ eventId: eventId });
  const participant = await User.findById(participantId);

  if (!event) {
    return next(new AppError("Event not found!"), 404);
  }
  if (!participant) {
    return next(new AppError("Participant not found"), 404);
  }

  event.paid_participants.push(participant._id);
  await event.save();

  participant.paid_events.push(event._id);
  await participant.save();

  res.status(200).json({
    status: "Success",
  });
});

exports.teamPay = asyncHandler(async (req, res, next) => {
  const { teamId } = req.params;
  const team = await Team.findById(teamId);

  if (!team) {
    return next(new AppError("Team not found!", 404));
  }

  team.isPaid = true;
  await team.save();

  res.status(200).json({
    status: "success",
  });
});

exports.createEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.create(req.body);

  const count = await Event.countDocuments();
  event.eventId = `${count}`;
  await event.save();

  res.status(201).json({
    status: "success",
    data: event,
  });
});

exports.getAllEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({});

  res.status(200).json({
    status: "success",
    events,
  });
});

exports.getEventById = asyncHandler(async (req, res, next) => {
  const event = await Event.findOne({ eventId: req.params.id });

  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  }

  var isRegistered = false;
  var isPaid = false;
  var teamId;
  var team = {};

  user.events.forEach((item) => {
    if (item.eventId.toString() == event._id.toString()) {
      isRegistered = true;
      if (item.teamId) {
        teamId = item.teamId;
      }
      return false;
    }
  });
  if (teamId) {
    team = await Team.findById(teamId);
  }

  user.paid_events.forEach((item) => {
    if (item.toString() == event._id.toString()) {
      isPaid = true;
      return false;
    }
  });

  res.status(200).json({
    status: "success",
    data: {
      isRegistered,
      isPaid,
      event,
      team,
    },
  });
});

exports.updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findOneAndUpdate(
    { eventId: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  res.status(201).json({
    status: "success",
    data: event,
  });
});

exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findOneAndDelete({ eventId: req.params.id });

  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  res.status(204).json({});
});

exports.getEventParticipants = asyncHandler(async (req, res, next) => {
  const event = await Event.findOne({ eventId: req.params.id });

  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  await event.populate({
    path: "participants",
    select:
      "-__v -events -paid_events -workshops -passwordChangedAt -passwordResetToken -passwordResetExpired",
  });

  res.status(201).json({
    status: "success",
    data: {
      participants: event.participants,
    },
  });
});

exports.getEventTeams = asyncHandler(async (req, res, next) => {
  const event = await Event.findOne({ eventId: req.params.id });

  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  await event.populate({
    path: "teams",
  });

  res.status(201).json({
    status: "success",
    data: {
      teams: event.teams,
    },
  });
});
