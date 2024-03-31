// models/vehicleFilterModel.js
const pool = require("../config/db");

// Get vehicle filter by ID
const getVehicleFilterById = async (vehicleFilterId) => {
  try {
    const vehicleFilter = await pool.query(
      "SELECT * FROM vehicle_filters WHERE id = $1",
      [vehicleFilterId]
    );
    return vehicleFilter.rows[0];
  } catch (error) {
    console.error("Error retrieving vehicle filter:", error);
    throw error;
  }
};

// Create vehicle filter
const createVehicleFilter = async (vehicleFilterData) => {
  try {
    const { vehicle_id, filter_id, value } = vehicleFilterData;
    const newVehicleFilter = await pool.query(
      "INSERT INTO vehicle_filters (vehicle_id, filter_id, value) VALUES ($1, $2, $3) RETURNING *",
      [vehicle_id, filter_id, value]
    );
    return newVehicleFilter.rows[0];
  } catch (error) {
    console.error("Error creating vehicle filter:", error);
    throw error;
  }
};

// Delete vehicle filter
const deleteVehicleFilter = async (vehicleFilterId) => {
  try {
    await pool.query("DELETE FROM vehicle_filters WHERE id = $1", [
      vehicleFilterId,
    ]);
  } catch (error) {
    console.error("Error deleting vehicle filter:", error);
    throw error;
  }
};

module.exports = {
  getVehicleFilterById,
  createVehicleFilter,
  deleteVehicleFilter,
};
