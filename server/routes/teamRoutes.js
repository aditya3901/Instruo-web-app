const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:event", eventController.populateEvent, teamController.getAllTeamsByEvent);

router.use(authController.protect);
router.post("/register/:event/:participantId", eventController.populateEvent, eventController.restrictTo("Individual"), teamController.registerIndividual);

router.post("/createTeam/:event/:leaderId", eventController.populateEvent, eventController.restrictTo("Team"), teamController.createTeam);
router.put("/addMember/:event/:teamId", eventController.populateEvent, eventController.restrictTo("Team"), teamController.populateTeam, teamController.addMember);

router.use(authController.restrictTo("admin"));
router.patch("/promote/:teamId", teamController.populateTeam, teamController.promoteTeam);
router.patch("/update/:teamId", teamController.populateTeam, teamController.updateTeam);

module.exports = router;