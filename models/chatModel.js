// models/chatModel.js
const pool = require("../config/db");

// Get chat by ID
const getChatById = async (chatId) => {
  try {
    const chat = await pool.query("SELECT * FROM chats WHERE id = $1", [
      chatId,
    ]);
    return chat.rows[0];
  } catch (error) {
    console.error("Error retrieving chat:", error);
    throw error;
  }
};

// Create chat
const createChat = async (chatData) => {
  try {
    const { user1_id, user2_id } = chatData;
    const newChat = await pool.query(
      "INSERT INTO chats (user1_id, user2_id) VALUES ($1, $2) RETURNING *",
      [user1_id, user2_id]
    );
    return newChat.rows[0];
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

// Delete chat
const deleteChat = async (chatId) => {
  try {
    await pool.query("DELETE FROM chats WHERE id = $1", [chatId]);
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
};

module.exports = {
  getChatById,
  createChat,
  deleteChat,
};
