const Categories = require("../models/Category");
const Category = require("../models/Category"); 

async function getAllCategories(req, res) {
  try {
    const categories = await Categories.findAll(); // Fetch all products from the database
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
}
async function AddCategories(req, res) {
  try {
    console.log(req.body);
    const { name, description, imageUrl, createdBy } = req.body;
    const newCategory = await Category.create({
      name,
      description,
      imageUrl,
      createdBy,
    });
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding category" });
  }
}
module.exports = {
  getAllCategories,
  AddCategories,
};
