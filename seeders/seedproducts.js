"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed categories
    const categories = [
      {
        name: "Acrylic tumblers",
        description: "Description for Acrylic tumblers category",
        imageUrl: "image1.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Stainless steel tumblers",
        description: "Description for Stainless steel tumblers category",
        imageUrl: "image2.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Wooden Gifts",
        description: "Description for Wooden Gifts category",
        imageUrl: "image3.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Glass Gifts",
        description: "Description for Glass Gifts category",
        imageUrl: "image4.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Doormats",
        description: "Description for Doormats image",
        imageUrl: "image5.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Clothing",
        description: "Description for Clothing image",
        imageUrl: "image6.jpeg",
        createdBy: "Admin",
      },
      {
        name: "Accessories",
        description: "Description for Accessories image",
        imageUrl: "image7.jpeg",
        createdBy: "Admin",
      },
    ];

    const [categoryRecords] = await queryInterface.bulkInsert(
      "Categories",
      categories,
      {
        returning: true,
      }
    );

    // Seed subcategories
    const subcategories = [
      // Acrylic tumblers
      {
        name: "coated",
        description: "Description for coated subcategory",
        categoryId: categoryRecords[0].id,
      },
      {
        name: "Non-coated",
        description: "Description for Non-coated subcategory",
        categoryId: categoryRecords[0].id,
      },

      // Stainless steel tumblers
      {
        name: "Plain thermal",
        description: "Description for Plain thermal subcategory",
        categoryId: categoryRecords[1].id,
      },
      {
        name: "Sublimation thermal",
        description: "Description for Sublimation thermal subcategory",
        categoryId: categoryRecords[1].id,
      },
      {
        name: "Non Glitter thermal",
        description: "Description for Non Glitter thermal subcategory",
        categoryId: categoryRecords[1].id,
      },
      {
        name: "Glitter thermal",
        description: "Description for Glitter thermal subcategory",
        categoryId: categoryRecords[1].id,
      },

      // Wooden Gifts
      {
        name: "hanger signs",
        description: "Description for hanger signs subcategory",
        categoryId: categoryRecords[2].id,
      },
      {
        name: "lazy susan",
        description: "Description for lazy susan subcategory",
        categoryId: categoryRecords[2].id,
      },

      // Glass Gifts
      {
        name: "Custom Mugs",
        description: "Description for Custom Mugs subcategory",
        categoryId: categoryRecords[3].id,
      },
      {
        name: "Custom Oven Dishes",
        description: "Description for Custom Oven Dishes subcategory",
        categoryId: categoryRecords[3].id,
      },
      {
        name: "Custom wine bottles",
        description: "Description for Custom wine bottles subcategory",
        categoryId: categoryRecords[3].id,
      },
      {
        name: "Custom whiskey bottles",
        description: "Description for Custom whiskey bottles subcategory",
        categoryId: categoryRecords[3].id,
      },
      {
        name: "Custom wine glasses",
        description: "Description for Custom wine glasses subcategory",
        categoryId: categoryRecords[3].id,
      },

      // Doormats
      {
        name: "Custom doormats",
        description: "Description for Custom doormats subcategory",
        categoryId: categoryRecords[4].id,
      },

      // Clothing
      {
        name: "T-shirts",
        description: "Description for T-shirts subcategory",
        categoryId: categoryRecords[5].id,
      },
      {
        name: "Hoodies",
        description: "Description for Hoodies subcategory",
        categoryId: categoryRecords[5].id,
      },
      {
        name: "Blankets",
        description: "Description for Blankets subcategory",
        categoryId: categoryRecords[5].id,
      },
      {
        name: "Baby onesies",
        description: "Description for Baby onesies subcategory",
        categoryId: categoryRecords[5].id,
      },

      // Accessories
      {
        name: "Keychains",
        description: "Description for Keychains subcategory",
        categoryId: categoryRecords[6].id,
      },
      {
        name: "Bag Tags",
        description: "Description for Bag Tags subcategory",
        categoryId: categoryRecords[6].id,
      },
      {
        name: "Tote Bags",
        description: "Description for Tote Bags subcategory",
        categoryId: categoryRecords[6].id,
      },
      {
        name: "Acrylic Signs",
        description: "Description for Acrylic Signs subcategory",
        categoryId: categoryRecords[6].id,
      },
    ];

    await queryInterface.bulkInsert("Subcategories", subcategories);

    // Special categories
    const specialCategories = [
      {
        name: "The wedding shop",
        description: "Description for The wedding shop",
        imageUrl: "wedding-shop.jpeg",
        createdBy: "Admin",
      },
      {
        name: "The baby shower shop",
        description: "Description for The baby shower shop",
        imageUrl: "baby-shower-shop.jpeg",
        createdBy: "Admin",
      },
      {
        name: "The house warming shop",
        description: "Description for The house warming shop",
        imageUrl: "house-warming-shop.jpeg",
        createdBy: "Admin",
      },
    ];
    const products = [];

    for (let i = 4; i <= 14; i++) {
      products.push({
        name: `Product ${i}`,
        description: `Description for Product ${i}`,
        cost: 10.99 + i,
        price: 19.99 + i,
        quantity: 100 - i,
        category: categoryRecords[0].id, // Category: Acrylic tumblers
        subCategory: subcategoryRecords[0].id, // Subcategory: coated
        imageUrl: `image${i}.jpeg`, // Use the corresponding image filename
      });
    }

    // Seed products
    await queryInterface.bulkInsert("Products", products);

    // Log the seeding results
    console.log("Products seeded successfully.");

    await queryInterface.bulkInsert("SpecialCategories", specialCategories);

    // Log the seeding results
    console.log(
      "Categories, sub-categories, and special categories seeded successfully."
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded data (use with caution)
    await queryInterface.bulkDelete("SpecialCategories", null, {});
    await queryInterface.bulkDelete("Subcategories", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Products", null, {});
  },
};
