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
    const { categoryId, name, description } = req.body;
    console.log(req.body);

    // Handle image upload and renaming
    if (req.file) {
      const imageFile = req.file;
      const newImageName = `${name.charAt(0).toUpperCase()}${name.substring(
        1
      )}_${Date.now()}.jpeg`;

      // Rename and save the image to the public/img/uploads folder
      imageFile.mv(`public/img/uploads/${newImageName}`, (err) => {
        if (err) {
          console.error("Error renaming and saving image:", err);
          return res
            .status(500)
            .json({ error: "Error updating category image" });
        }

        // Update the imageUrl, name, and description fields in the Category model
        Category.update(
          { imageUrl: newImageName, name: name, description: description },
          { where: { id: categoryId } }
        )
          .then(() => {
            console.log("Category updated successfully");
            return res
              .status(200)
              .json({ message: "Category updated successfully" });
          })
          .catch((error) => {
            console.error("Error updating Category model:", error);
            return res.status(500).json({ error: "Error updating category" });
          });
      });
    } else {
      // If no image is uploaded, update the name and description fields in the Category model
      Category.update(
        { name: name, description: description },
        { where: { id: categoryId } }
      )
        .then(() => {
          console.log("Category updated successfully");
          return res
            .status(200)
            .json({ message: "Category updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating Category model:", error);
          return res.status(500).json({ error: "Error updating category" });
        });
    }
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
