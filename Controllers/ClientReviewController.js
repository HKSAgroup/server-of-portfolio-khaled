const ClientReview = require("../Models/ClientReviewModel");


exports.AddReviewController = (req, res) => {
    const review = new ClientReview(req.body);
    review.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save review in DB"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            review
        });
    });
}

exports.getReview = (req, res) => {
    //  get all banner
    ClientReview.find().exec((err, review) => {
        if (err) {
            return res.status(400).json({
                error: "Client Review not found"
            });
        }
        res.json(review);
    }
    );
}


exports.getReviewDetails = (req, res) => {
    //  get all banner
    const id = req.params.id

    const clientsReview = ClientReview.findById(id).exec((err, review) => {
        if (err) {
            return res.status(400).json({
                error: "Review not found"
            });
        }
        res.json(review);
    }
    );

}

exports.deleteReview = (req, res) => {
    //  delete category
    const id = req.params.id
    ClientReview.findByIdAndDelete(id).exec((err, review) => {
        if (err) {
            return res.status(400).json({
                error: "Review not found"
            });
        }
        res.json(review);
    }
    );
}

// update portfolio 
exports.UpdateReviewController = (req, res) => {
    // update portfolio
    const id = req.params.id

    const { image, name, content, title } = req.body

    ClientReview.findByIdAndUpdate(id, {image, name, content, title }, { new: true }).exec((err, review) => {
        if (err) {
            return res.status(400).json({
                error: "Review not found"
            });
        }
        res.json({
            status: "success",
            message: "data updated successfully!",
            review
        });
    }
    );
}