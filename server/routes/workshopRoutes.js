const express = require("express")
const workshopController = require("../controllers/workshopController")

const router = express.Router()

router.post("/create", workshopController.createWorkshop)
router.get("/", workshopController.getAllWorkshops)
router.post("/register", workshopController.register)
router.post("/:id", workshopController.getWorkshopById)

module.exports = router
