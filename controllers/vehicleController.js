// controllers/vehicleController.js
const pool = require("../config/db");

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      id,
    ]);
    res.json(vehicle.rows[0]);
  } catch (error) {
    console.error("Error retrieving vehicle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create vehicle
const createVehicle = async (req, res) => {
  try {
    const { name, category_id, showroom_id, price, year, description } =
      req.body;
    const newVehicle = await pool.query(
      "INSERT INTO vehicles (name, category_id, showroom_id, price, year, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, category_id, showroom_id, price, year, description]
    );
    res.status(201).json(newVehicle.rows[0]);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, showroom_id, price, year, description } =
      req.body;
    const updatedVehicle = await pool.query(
      "UPDATE vehicles SET name = $1, category_id = $2, showroom_id = $3, price = $4, year = $5, description = $6 WHERE id = $7 RETURNING *",
      [name, category_id, showroom_id, price, year, description, id]
    );
    res.json(updatedVehicle.rows[0]);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
