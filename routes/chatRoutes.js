// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Define chat routes
router.get("/:id", chatController.getChatById);
router.post("/", chatController.createChat);
router.delete("/:id", chatController.deleteChat);

module.exports = router;
