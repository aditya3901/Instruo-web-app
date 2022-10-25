const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:eventId", teamController.getAllTeamsByEvent);

router.use(authController.protect);
router.post("/register/:event/:participant", teamController.registerIndividual);

router.post("/createTeam/:event/:leader", eventController.restrictTo("team"), teamController.createTeam);
router.put("/addMember/:event/:team", eventController.restrictTo("team"), teamController.addMember);

router.use(authController.restrictTo("admin"));
router.patch("/promote/:team", teamController.promoteTeam);
router.patch("/update/:team", teamController.updateTeam);

module.exports = router;