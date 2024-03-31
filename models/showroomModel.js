// models/showroomModel.js
const pool = require("../config/db");

// Get showroom by ID
const getShowroomById = async (showroomId) => {
  try {
    const showroom = await pool.query("SELECT * FROM showrooms WHERE id = $1", [
      showroomId,
    ]);
    return showroom.rows[0];
  } catch (error) {
    console.error("Error retrieving showroom:", error);
    throw error;
  }
};

// Create showroom
const createShowroom = async (showroomData) => {
  try {
    const { name, location } = showroomData;
    const newShowroom = await pool.query(
      "INSERT INTO showrooms (name, location) VALUES ($1, $2) RETURNING *",
      [name, location]
    );
    return newShowroom.rows[0];
  } catch (error) {
    console.error("Error creating showroom:", error);
    throw error;
  }
};

// Update showroom
const updateShowroom = async (showroomId, showroomData) => {
  // Implementation similar to createShowroom
};

// Delete showroom
const deleteShowroom = async (showroomId) => {
  // Implementation similar to createShowroom
};

module.exports = {
  getShowroomById,
  createShowroom,
  updateShowroom,
  deleteShowroom,
};
