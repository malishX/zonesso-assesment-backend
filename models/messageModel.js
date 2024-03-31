// models/messageModel.js
const pool = require("../config/db");

// Get message by ID
const getMessageById = async (messageId) => {
  try {
    const message = await pool.query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);
    return message.rows[0];
  } catch (error) {
    console.error("Error retrieving message:", error);
    throw error;
  }
};

// Create message
const createMessage = async (messageData) => {
  try {
    const { chat_id, sender_id, message } = messageData;
    const newMessage = await pool.query(
      "INSERT INTO messages (chat_id, sender_id, message) VALUES ($1, $2, $3) RETURNING *",
      [chat_id, sender_id, message]
    );
    return newMessage.rows[0];
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

// Delete message
const deleteMessage = async (messageId) => {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

module.exports = {
  getMessageById,
  createMessage,
  deleteMessage,
};
