// controllers/userController.js
const pool = require("../config/db");

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
