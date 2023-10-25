const Product = require("../models/Product");
const { saveBase64Image } = require("./savefile");

// Function to get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll(); // Fetch all products from the database
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
}
async function getProduct(req, res) {
  try {
    const productId = parseInt(req.params.productId);
    console.log(productId);
    const product = await Product.findByPk(productId); // Use findByPk to find a product by its primary key
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product" });
  }
}

// Function to add a new product
async function addProduct(req, res) {
  try {
    console.log("Received request body:", req.body);

    const {
      name,
      description,
      cost,
      price,
      quantity,
      size,
      weight,
      category,
      color,
      availability,
    } = req.body;
    const updatedby = "Admin";

    // Initialize an array to store image filenames
    const imageFilenames = [];
    // Check if images were uploaded
    if (req.body.images) {      
      for (const image of req.body.images) {
      
        const imageData = image;
        const newImageName = await saveBase64Image(imageData);      
        imageFilenames.push(newImageName);
      }
    }

    // Create a new product using the Product model and include the image filenames
    const newProduct = await Product.create({
      name,
      description,
      cost,
      price,
      quantity,
      size,
      weight,
      category,
      color,
      availability,
      imagesurl: imageFilenames, // Include the image filenames array in the product data
      updatedby,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
}
async function updateProduct(req, res) {
  try {
    console.log("Received request body:", req.body);

    const {
      ProductId,
      name,
      description,
      cost,
      price,
      quantity,
      size,
      category,
      subcategory,
      weight,
      color,
      availability,
    } = req.body;
    const updatedby = "Admin";
    console.log();
    const imageFilenames = [];

    const originalProduct = await Product.findByPk(ProductId);
    if (req.body.images) {
      for (const image of req.body.images) {
        const imageData = image;
        const newImageName = await saveBase64Image(imageData);
        imageFilenames.push(newImageName);
      }
    } else {
      const productImages = originalProduct.imagesurl;
      for (const dbimage of productImages) {
        imageFilenames.push(dbimage);
      }
      // imageFilenames = originalProduct.imagesurl;
    }

    let updatedFields = {
      name: name,
      description: description,
      cost: cost,
      price: price,
      quanntity: quantity,
      size: size,
      weight: weight,
      color: color,
      category: category,
      subCategory: subcategory,
      availability: availability,
      imagesurl: imageFilenames, // Include the image filenames array in the product data
      updatedby: updatedby,
    };

    Product.update(updatedFields, { where: { productid: ProductId } })
      .then(() => {
        console.log("Product updated successfully");
        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating Product model:", error);
        return res.status(500).json({ error: "Error updating Product" });
      });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
}
async function deleteProduct(req, res) {
  try {
    const productId = req.params.productId;
    // console.log(req.body);
    const product = await Product.findByPk(productId);
    if (!product) {
      console.log("Product not foud");
      return res.json(404).json({ error: "Product not found" });
    }
    await product.destroy();
    return res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    console.error("Deleting products:", error);
    res.status(500).json({
      success: false,
      message: "Error deleteingproducts",
      error: error.message,
    });
  }
}

async function generateTestProducts(req, res) {
  try {
    const numProducts = 22;
    // Generate test products
    const testProducts = [];
    for (let i = 1; i <= numProducts; i++) {
      testProducts.push({
        name: `Test Product ${i}`,
        description: `Description for Test Product ${i}`,
        imagesurl: [`image${i}.jpg`],
        cost: Math.random() * 100,
        price: Math.random() * 200,
        quantity: Math.floor(Math.random() * 100),
        size: "Medium",
        weight: Math.random() * 2,
        color: "Blue",
        availability: true,
        updatedby: "Admin",
      });
    }
    // Bulk insert test products
    await Product.bulkCreate(testProducts);
    res.status(201).json({
      success: true,
      message: `${numProducts} test products generated and added successfully`,
    });
  } catch (error) {
    console.error("Error generating test products:", error);
    res.status(500).json({
      success: false,
      message: "Error generating test products",
      error: error.message,
    });
  }
}

module.exports = {
  getAllProducts,
  addProduct,
  generateTestProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
