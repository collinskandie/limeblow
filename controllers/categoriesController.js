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
const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Attempt to find the category by ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      console.log("Category not found");
      return res.status(404).json({ error: "Category not found" });
    }
    // If the category exists, you can delete it
    await category.destroy();
    console.log("category deleted");

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Category deletion failed" });
  }
};
const editCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { categoryId, name, image } = req.body;
    console.log(categoryId);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      console.log("Category not found");
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(404).json({ success: "Category found" });
    // await category.update;
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error editing category" });
  }
};
module.exports = {
  getAllCategories,
  AddCategories,
  deleteCategory,
  editCategory,
};
