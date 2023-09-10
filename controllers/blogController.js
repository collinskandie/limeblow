const Blog = require("../models/blog");

const addBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Create a new blog post instance and save it to the database
    const blogDetails = await Blog.create({
      title,
      description,
      image,
    });

    console.log(blogDetails);

    res.status(200).json({
      success: true,
      message: "Blog saved successfully",
      details: blogDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error saving the blog post" });
  }
};

module.exports = {
  addBlog,
};
