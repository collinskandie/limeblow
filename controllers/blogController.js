const Blog = require("../models/blog");
const { saveBase64Image } = require("./savefile");

const addBlog = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const imageName = await saveBase64Image(image);

    console.log(req.body);
    const blogDetails = await Blog.create({
      title: name,
      description: description,
      image: imageName,
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
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      console.log("Blog not found");
      return res.status(404).json({ error: "Blog not found" });
    }
    // If the category exists, you can delete it
    await blog.destroy();
    console.log("Blog deleted");

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {}
};

module.exports = {
  addBlog,
  deleteBlog,
};
