const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:eventId", eventController.populateEvent, teamController.getAllTeamsByEvent);

router.use(authController.protect);
router.post("/register/:eventId/:participantId", eventController.populateEvent,  eventController.restrictTo("individual"), teamController.registerIndividual);

router.post("/createTeam/:eventId/:leaderId", eventController.populateEvent, eventController.restrictTo("team"), teamController.createTeam);
router.put("/addMember/:eventId/:teamId", eventController.populateEvent, eventController.restrictTo("team"), teamController.populateTeam, teamController.addMember);

router.use(authController.restrictTo("admin"));
router.patch("/promote/:teamId", teamController.populateTeam, teamController.promoteTeam);
router.patch("/update/:teamId", teamController.populateTeam, teamController.updateTeam);

module.exports = router;