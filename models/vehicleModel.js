// models/vehicleModel.js
const pool = require("../config/db");

// Get vehicle by ID
const getVehicleById = async (vehicleId) => {
  try {
    const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      vehicleId,
    ]);
    return vehicle.rows[0];
  } catch (error) {
    console.error("Error retrieving vehicle:", error);
    throw error;
  }
};

// Create vehicle
const createVehicle = async (vehicleData) => {
  try {
    const { name, category_id, showroom_id, price, year, description } =
      vehicleData;
    const newVehicle = await pool.query(
      "INSERT INTO vehicles (name, category_id, showroom_id, price, year, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, category_id, showroom_id, price, year, description]
    );
    return newVehicle.rows[0];
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

// Update vehicle
const updateVehicle = async (vehicleId, vehicleData) => {
  try {
    const { name, category_id, showroom_id, price, year, description } =
      vehicleData;
    const updatedVehicle = await pool.query(
      "UPDATE vehicles SET name = $1, category_id = $2, showroom_id = $3, price = $4, year = $5, description = $6 WHERE id = $7 RETURNING *",
      [name, category_id, showroom_id, price, year, description, vehicleId]
    );
    return updatedVehicle.rows[0];
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

// Delete vehicle
const deleteVehicle = async (vehicleId) => {
  try {
    await pool.query("DELETE FROM vehicles WHERE id = $1", [vehicleId]);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

module.exports = {
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
