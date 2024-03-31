// models/userModel.js
const pool = require("../config/db");

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    return user.rows[0];
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

// Create user
const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return newUser.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, userData) => {
  try {
    const { name, email, password } = userData;
    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, userId]
    );
    return updatedUser.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
