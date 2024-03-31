// controllers/showroomController.js
const pool = require("../config/db");

// Get showroom by ID
const getShowroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const showroom = await pool.query("SELECT * FROM showrooms WHERE id = $1", [
      id,
    ]);
    res.json(showroom.rows[0]);
  } catch (error) {
    console.error("Error retrieving showroom:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create showroom
const createShowroom = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newShowroom = await pool.query(
      "INSERT INTO showrooms (name, location) VALUES ($1, $2) RETURNING *",
      [name, location]
    );
    res.status(201).json(newShowroom.rows[0]);
  } catch (error) {
    console.error("Error creating showroom:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update showroom
const updateShowroom = async (req, res) => {
  // Implementation similar to createShowroom
};

// Delete showroom
const deleteShowroom = async (req, res) => {
  // Implementation similar to createShowroom
};

module.exports = {
  getShowroomById,
  createShowroom,
  updateShowroom,
  deleteShowroom,
};
