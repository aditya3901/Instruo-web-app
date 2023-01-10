const mongoose = require("mongoose");
const slugify = require("slugify");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    unique: true,
  },
  subtitle: String,
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ["Team", "Individual"],
      message: "Not a valid type",
    },
    default: "Individual",
  },
  desc: {
    type: String,
    required: true,
  },
  image: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  prizes: [
    {
      standing: String,
      reward: String,
      color: String,
    },
  ],
  schedule: [
    {
      title: String,
      desc: String,
      date: Date,
      time: String,
      duration: String,
      venue: String,
    },
  ],
  contacts: [
    {
      name: String,
      phone: String,
      email: String,
      photo: String,
    },
  ],
  rules: [String],
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  teams: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
    },
  ],
});

eventSchema.pre("save", function (next) {
  this.eventId = slugify(this.title, { lower: true });
  next();
});

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: "participants",
    select:
      "-__v -events -passwordChangedAt -passwordResetToken -passwordResetExpired",
  });

  this.populate({
    path: "teams",
    select:
      "-__v",
  });

  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
