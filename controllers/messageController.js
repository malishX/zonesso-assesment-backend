// controllers/messageController.js
const pool = require("../config/db");

// Get message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    res.json(message.rows[0]);
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create message
const createMessage = async (req, res) => {
  try {
    const { chat_id, sender_id, message } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (chat_id, sender_id, message) VALUES ($1, $2, $3) RETURNING *",
      [chat_id, sender_id, message]
    );
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMessageById,
  createMessage,
  deleteMessage,
};
