const Category = require("../Models/CategoryModel");

exports.AddCategoryController = (req, res) => {
//    post category
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        res.json({ category });
    });
}

exports.getCategory = (req, res) => {
    //  get all category
    Category.find().exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        res.json(category);
    }
    );

}


exports.deleteCategory = (req, res) => {
    //  delete category
    const id = req.params.id
    Category.findByIdAndDelete(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        res.json(category);
    }
    );
}
