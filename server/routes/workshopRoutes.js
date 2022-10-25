const express = require("express");
const workshopController = require("../controllers/workshopController");

const router = express.Router();

router.get("/", workshopController.getAllWorkshops);
router.get("/:id", workshopController.getWorkshopById);

router.post("/create", workshopController.createWorkshop);

module.exports = router;
