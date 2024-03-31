// models/categoryModel.js
const pool = require("../config/db");

// Get category by ID
const getCategoryById = async (categoryId) => {
  try {
    const category = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );
    return category.rows[0];
  } catch (error) {
    console.error("Error retrieving category:", error);
    throw error;
  }
};

// Create category
const createCategory = async (categoryData) => {
  try {
    const { name } = categoryData;
    const newCategory = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    return newCategory.rows[0];
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update category
const updateCategory = async (categoryId, categoryData) => {
  try {
    const { name } = categoryData;
    const updatedCategory = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, categoryId]
    );
    return updatedCategory.rows[0];
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete category
const deleteCategory = async (categoryId) => {
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

module.exports = {
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
