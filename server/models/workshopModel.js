const mongoose = require("mongoose")

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
	participants: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	],
})

const Workshop = mongoose.model("Workshop", workshopSchema)

module.exports = Workshop
