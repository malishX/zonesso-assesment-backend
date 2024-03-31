// controllers/chatController.js
const pool = require("../config/db");

// Get chat by ID
const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await pool.query("SELECT * FROM chats WHERE id = $1", [id]);
    res.json(chat.rows[0]);
  } catch (error) {
    console.error("Error retrieving chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create chat
const createChat = async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;
    const newChat = await pool.query(
      "INSERT INTO chats (user1_id, user2_id) VALUES ($1, $2) RETURNING *",
      [user1_id, user2_id]
    );
    res.status(201).json(newChat.rows[0]);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete chat
const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM chats WHERE id = $1", [id]);
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getChatById,
  createChat,
  deleteChat,
};
