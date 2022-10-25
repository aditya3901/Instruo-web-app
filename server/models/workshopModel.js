const mongoose = require("mongoose");
const slugify = require("slugify");

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  workshopId: {
    type: String,
    unique: true,
  },
  subtitle: String,
  category: {
    type: String,
    required: true,
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
  schedule: [
    {
      title: String,
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
    },
  ],
  rules: [String],
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  speakers: [
    {
      name: String,
      image: String,
      about: String,
      contact: {
        twitter: String,
        email: String,
        linkedin: String,
      },
    },
  ],
});

workshopSchema.pre("save", function (next) {
  this.workshopId = slugify(this.title, { lower: true });
  next();
});

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
