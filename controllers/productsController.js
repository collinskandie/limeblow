const Product = require("../models/Product");

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

    // const name =req.body.name;
    const {
      name,
      description,
      imagesurl,
      cost,
      price,
      quantity,
      size,
      weight,
      color,
      availability,
      updatedby,
    } = req.body;

    // Create a new product using the Product model
    const newProduct = await Product.create({
      name,
      description,
      imagesurl,
      cost,
      price,
      quantity,
      size,
      weight,
      color,
      availability,
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
};
