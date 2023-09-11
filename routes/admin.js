const express = require("express");
const router = express.Router();
// const app = express();

router.get("/", async (req, res) => {
  try {
    res.render("admin/index", {
      title: "Login",
      layout: "layouts/admin_layout.ejs",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});
router.get("/admin_login", async (req, res) => {
  try {
    res.render("admin/admin_login", {
      title: "Login",
      layout: "layouts/admin_layout.ejs",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

module.exports = router;
