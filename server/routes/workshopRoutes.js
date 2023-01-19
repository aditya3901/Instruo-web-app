const express = require("express");
const workshopController = require("../controllers/workshopController");

const router = express.Router();

router.post("/create", workshopController.createWorkshop);

router.get("/", workshopController.getAllWorkshops);
router.get("/:id", workshopController.getWorkshopById);

module.exports = router;
