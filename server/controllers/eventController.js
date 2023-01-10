const asyncHandler = require("express-async-handler");
const { uuid } = require("uuidv4");
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

  participant.events.push(event._id);
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
  const { eventId, teamId, participantId, college } = req.body;

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
  if (team && team.college == college) {
    flag = 0;
    team.participants.push(participant._id);
  }

  await team.save();

  if (flag == 0) {
    res.status(200).json({
      status: "success",
      message: "Registration Successful",
    });
  } else {
    res.status(200).json({
      status: "fail",
      message: "Registration Failed",
    });
  }
});

exports.createEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.create(req.body);

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

  res.status(200).json({
    status: "success",
    data: {
      event,
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

  res.status(201).json({
    status: "success",
    data: {
      participants: event.participants,
    },
  });
});
