// models/filterModel.js
const pool = require("../config/db");

// Get filter by ID
const getFilterById = async (filterId) => {
  try {
    const filter = await pool.query("SELECT * FROM filters WHERE id = $1", [
      filterId,
    ]);
    return filter.rows[0];
  } catch (error) {
    console.error("Error retrieving filter:", error);
    throw error;
  }
};

// Create filter
const createFilter = async (filterData) => {
  try {
    const { name } = filterData;
    const newFilter = await pool.query(
      "INSERT INTO filters (name) VALUES ($1) RETURNING *",
      [name]
    );
    return newFilter.rows[0];
  } catch (error) {
    console.error("Error creating filter:", error);
    throw error;
  }
};

// Update filter
const updateFilter = async (filterId, filterData) => {
  try {
    const { name } = filterData;
    const updatedFilter = await pool.query(
      "UPDATE filters SET name = $1 WHERE id = $2 RETURNING *",
      [name, filterId]
    );
    return updatedFilter.rows[0];
  } catch (error) {
    console.error("Error updating filter:", error);
    throw error;
  }
};

// Delete filter
const deleteFilter = async (filterId) => {
  try {
    await pool.query("DELETE FROM filters WHERE id = $1", [filterId]);
  } catch (error) {
    console.error("Error deleting filter:", error);
    throw error;
  }
};

module.exports = {
  getFilterById,
  createFilter,
  updateFilter,
  deleteFilter,
};
