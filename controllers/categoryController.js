// controllers/categoryController.js
const pool = require("../config/db");

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );
    res.json(category.rows[0]);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(newCategory.rows[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    res.json(updatedCategory.rows[0]);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
