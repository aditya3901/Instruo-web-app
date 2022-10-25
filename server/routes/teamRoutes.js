const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:eventId", eventController.populateEvent, teamController.getAllTeamsByEvent);

router.use(authController.protect);
router.post("/register/:eventId/:participantId", eventController.populateEvent, teamController.registerIndividual);

router.post("/createTeam/:eventId/:leaderId", eventController.populateEvent, eventController.restrictTo("team"), teamController.createTeam);
router.put("/addMember/:eventId/:teamId", eventController.populateEvent, eventController.restrictTo("team"), teamController.populateTeam, teamController.addMember);

router.use(authController.restrictTo("admin"));
router.use(teamController.populateTeam);
router.patch("/promote/:teamId", teamController.promoteTeam);
router.patch("/update/:teamId", teamController.updateTeam);

module.exports = router;