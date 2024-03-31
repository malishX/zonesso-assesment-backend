// controllers/vehicleFilterController.js
const pool = require("../config/db");

// Get vehicle filter by ID
const getVehicleFilterById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleFilter = await pool.query(
      "SELECT * FROM vehicle_filters WHERE id = $1",
      [id]
    );
    res.json(vehicleFilter.rows[0]);
  } catch (error) {
    console.error("Error retrieving vehicle filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create vehicle filter
const createVehicleFilter = async (req, res) => {
  try {
    const { vehicle_id, filter_id, value } = req.body;
    const newVehicleFilter = await pool.query(
      "INSERT INTO vehicle_filters (vehicle_id, filter_id, value) VALUES ($1, $2, $3) RETURNING *",
      [vehicle_id, filter_id, value]
    );
    res.status(201).json(newVehicleFilter.rows[0]);
  } catch (error) {
    console.error("Error creating vehicle filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete vehicle filter
const deleteVehicleFilter = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM vehicle_filters WHERE id = $1", [id]);
    res.json({ message: "Vehicle filter deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle filter:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getVehicleFilterById,
  createVehicleFilter,
  deleteVehicleFilter,
};
