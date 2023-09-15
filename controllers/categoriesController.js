const Categories = require("../models/Category");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const { saveBase64Image } = require("./savefile");

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
    let createdBy = "Admin";
    const { name, description, image } = req.body;
    const filename = await saveBase64Image(image);

    const newCategory = await Category.create({
      name,
      description,
      imageUrl: filename, // Updated image URL
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
    const { categoryId, name, description, image } = req.body;
    // Fetch the original category data
    const originalCategory = await Category.findByPk(categoryId);

    let updatedFields = {
      name: name,
      description: description,
    };

    // Check if an image is provided in the request
    if (image) {
      const newImageName = await saveBase64Image(image);
      updatedFields.imageUrl = newImageName;
    } else {
      // If no new image is provided, retain the original image name
      updatedFields.imageUrl = originalCategory.imageUrl;
    }

    Category.update(updatedFields, { where: { id: categoryId } })
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
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error editing category" });
  }
};

async function AddsubCategories(req, res) {
  try {
    let createdBy = "Admin";
    const { name, description, image } = req.body;
    const filename = await saveBase64Image(image);

    const newsubCategory = await Subcategory.create({
      name,
      description,
      imageUrl: filename, // Updated image URL
      createdBy,
    });
    return res.status(201).json({
      success: true,
      message: "Subcategory added successfully",
      category: newsubCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding category" });
  }
}
//subcategories controllers

const deletesubCategory = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    // Attempt to find the category by ID
    const subcategory = await Subcategory.findByPk(subcategoryId);

    if (!subcategory) {
      console.log("Subcategory not found");
      return res.status(404).json({ error: "Subcategory not found" });
    }
    await subcategory.destroy();
    console.log("subcategory deleted");
    return res
      .status(200)
      .json({ message: "subcategory deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "subcategory deletion failed" });
  }
};
const editsubCategory = async (req, res) => {
  try {
    const { subcategoryId, name, description, image } = req.body;

    // Fetch the original category data
    const originalsubCategory = await Subcategory.findByPk(subcategoryId);

    let updatedFields = {
      name: name,
      description: description,
    };

    // Check if an image is provided in the request
    if (image) {
      const newImageName = await saveBase64Image(image); 
      updatedFields.imageUrl = newImageName;
    } else {
      // If no new image is provided, retain the original image name
      updatedFields.imageUrl = originalsubCategory.imageUrl;
    }

    Subcategory.update(updatedFields, { where: { id: subcategoryId } })
      .then(() => {
        console.log("Subcategory updated successfully");
        return res
          .status(200)
          .json({ message: "Subcategory updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating Subcategory model:", error);
        return res.status(500).json({ error: "Error updating Subcategory" });
      });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error editing Subcategory" });
  }
};

module.exports = {
  getAllCategories,
  AddCategories,
  deleteCategory,
  editCategory,
  AddsubCategories,
  deletesubCategory,
  editsubCategory,
};
