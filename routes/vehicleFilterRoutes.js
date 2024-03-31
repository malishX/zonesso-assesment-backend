// routes/vehicleFilterRoutes.js
const express = require("express");
const router = express.Router();
const vehicleFilterController = require("../controllers/vehicleFilterController");

// Define vehicle filter routes
router.get("/:id", vehicleFilterController.getVehicleFilterById);
router.post("/", vehicleFilterController.createVehicleFilter);
router.delete("/:id", vehicleFilterController.deleteVehicleFilter);

module.exports = router;
