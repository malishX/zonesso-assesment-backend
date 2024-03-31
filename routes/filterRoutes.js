// routes/filterRoutes.js
const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");

// Define filter routes
router.get("/:id", filterController.getFilterById);
router.post("/", filterController.createFilter);
router.put("/:id", filterController.updateFilter);
router.delete("/:id", filterController.deleteFilter);

module.exports = router;
