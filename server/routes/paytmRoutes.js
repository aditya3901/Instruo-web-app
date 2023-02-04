const express = require("express");
const paytmController = require("../controllers/paytmController")
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/generateTransactionToken", authController.protect, paytmController.createTransactionToken);
router.get("/paymentStatus", authController.protect, paytmController.getPaymentStatus);

module.exports = router;