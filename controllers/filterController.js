// controllers/filterController.js
const pool = require("../config/db");

// Get filter by ID
const getFilterById = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = await pool.query("SELECT * FROM filters WHERE id = $1", [
      id,
    ]);
    res.json(filter.rows[0]);
  } catch (error) {
    console.error("Error retrieving filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create filter
const createFilter = async (req, res) => {
  try {
    const { name } = req.body;
    const newFilter = await pool.query(
      "INSERT INTO filters (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(newFilter.rows[0]);
  } catch (error) {
    console.error("Error creating filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update filter
const updateFilter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedFilter = await pool.query(
      "UPDATE filters SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.json(updatedFilter.rows[0]);
  } catch (error) {
    console.error("Error updating filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete filter
const deleteFilter = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM filters WHERE id = $1", [id]);
    res.json({ message: "Filter deleted successfully" });
  } catch (error) {
    console.error("Error deleting filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFilterById,
  createFilter,
  updateFilter,
  deleteFilter,
};
