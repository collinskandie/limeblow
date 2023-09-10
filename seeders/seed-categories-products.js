"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert("Categories", [
        {
          name: "Acrylic tumblers",
          description: "Description for Acrylic tumblers category",
          imageUrl: "category1.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Stainless steel tumblers",
          description: "Description for Stainless steel tumblers category",
          imageUrl: "category2.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wooden Gifts",
          description: "Description for Wooden Gifts category",
          imageUrl: "category3.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Glass Gifts",
          description: "Description for Glass Gifts category",
          imageUrl: "category4.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Doormats",
          description: "Description for Doormats category",
          imageUrl: "category5.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          description: "Description for Clothing category",
          imageUrl: "category6.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Accessories",
          description: "Description for Accessories category",
          imageUrl: "category7.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const categories = await queryInterface.sequelize.query(
        "SELECT id FROM Categories;",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      const subcategories = [
        // Acrylic tumblers
        {
          name: "coated",
          description: "Description for coated subcategory",
          // categoryId: categories[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Non-coated",
          description: "Description for Non-coated subcategory",
          // categoryId: categories[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more subcategories as needed
      ];

      await queryInterface.bulkInsert("Subcategories", subcategories);

      // Seed special categories
      const specialCategories = [
        {
          name: "The wedding shop",
          description: "Description for The wedding shop",
          imageUrl: "wedding-shop.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The baby shower shop",
          description: "Description for The baby shower shop",
          imageUrl: "baby-shower-shop.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The house warming shop",
          description: "Description for The house warming shop",
          imageUrl: "house-warming-shop.jpg",
          createdBy: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // await queryInterface.bulkInsert("SpecialCategories", specialCategories);

      // Seed products
      const products = [];

      for (let i = 4; i <= 14; i++) {
        const productImages = [];

        // Generating an array of image URLs
        for (let j = 1; j <= 5; j++) {
          productImages.push(`image${i}.jpeg`);
        }

        products.push({
          name: `Product ${i}`,
          description: `Description for Product ${i}`,
          cost: 10.99 + i,
          price: 19.99 + i,
          quantity: 100 - i,
          category: categories[0].id, // Use the appropriate category
          subCategory: subcategories[0].id, // Use the appropriate subcategory
          imagesurl: JSON.stringify(productImages), // Array of image URLs
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }    

      await queryInterface.bulkInsert("Products", products);

      console.log("Seeding completed successfully.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },
 
  down: async (queryInterface, Sequelize) => {
    // Remove all seeded data (use with caution)
    try {
      await queryInterface.bulkDelete("SpecialCategories", null, {});
      await queryInterface.bulkDelete("Subcategories", null, {});
      await queryInterface.bulkDelete("Categories", null, {});
      await queryInterface.bulkDelete("Products", null, {});

      console.log("Data seeding reversed successfully.");
    } catch (error) {
      console.error("Error reverting data seeding:", error);
    }
  },
};
