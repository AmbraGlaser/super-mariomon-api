const express = require("express");
const router = express.Router();
const captureController = require("../controllers/captureController");

// Get all captures
router.get("/", captureController.getAllCaptures);

// Make new captures
router.post("/", captureController.createCapture);

module.exports = router;
