const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

router.use(authController.protect);
router.post("/register", eventController.registerForEvent);
router.post("/registerTeam", eventController.createTeamForEvent);
router.post("/joinTeam", eventController.joinTeamForEvent);

router.use(authController.restrictTo("admin"));
router.post("/create", eventController.createEvent);
router.patch("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);
router.get("/:id/participants", eventController.getEventParticipants);
router.get("/:id/teams", eventController.getEventTeams);

module.exports = router;
