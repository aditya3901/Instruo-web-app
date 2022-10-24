const asyncHandler = require("express-async-handler");
const { uuid } = require("uuidv4");
const AppError = require("../utils/appError");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.restrictTo = 
  (...types) => 
  (req, res, next) => {
    if (types.includes(req.event.types)) return next();

    return next(
      new AppError("You don't have permission to perform this action.", 403)
    );
  };

exports.registerForEvent = asyncHandler(async (req, res, next) => {
  const { eventId, participantId } = req.body;
  const event = await Event.find({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const participant = await User.findById(participantId);
  if (!participant) {
    return next(new AppError("Participant Does Not Exist", 404));
  }

  event.participants.push(participantId);
  event.save();

  participant.events.push(eventId);
  participant.save();

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
  });
});

exports.createTeamForEvent = asyncHandler(async (req, res, next) => {
  const { eventId } = req.body;
  const event = await Event.find({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  const { teamName, college, participantId } = req.body;
  const teamId = uuid();
  event.teams.push({
    teamId: teamId,
    teamName: teamName,
    college: college,
    participants: [participantId],
  });
  await event.save();

  res.status(201).json({
    status: "success",
    message: "Registration Successful",
    eventId,
    teamId,
  });
});

exports.joinTeamForEvent = asyncHandler(async (req, res, next) => {
  const { eventId, teamId, participantId, college } = req.body;

  const event = await Event.find({ eventId: eventId });
  if (!event) {
    return next(new AppError("Event Does Not Exist", 404));
  }

  var flag = -1;
  event.teams.every((team) => {
    if (team.teamId == teamId && team.college == college) {
      flag = 0;
      team.participants.push(participantId);
      return false;
    }
  });

  await event.save();

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
  const event = await Event.find({ eventId: req.params.id });

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
  const event = await Event.find({ eventId: req.params.id });

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
