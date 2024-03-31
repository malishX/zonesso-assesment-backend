// routes/showroomRoutes.js
const express = require("express");
const router = express.Router();
const showroomController = require("../controllers/showroomController");

// Define showroom routes
router.get("/:id", showroomController.getShowroomById);
router.post("/", showroomController.createShowroom);
router.put("/:id", showroomController.updateShowroom);
router.delete("/:id", showroomController.deleteShowroom);

module.exports = router;
