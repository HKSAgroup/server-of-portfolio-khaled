const express = require("express");
const { getCategory, AddCategoryController, deleteCategory } = require("../Controllers/CategoryController");

const router = express.Router();

router.route("/").get(getCategory).post(AddCategoryController);
router.route("/:id").delete(deleteCategory);




module.exports = router;
