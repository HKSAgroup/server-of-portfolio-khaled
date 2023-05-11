
const express = require("express");
const { getReview, AddReviewController, deleteReview, UpdateReviewController, getReviewDetails } = require("../Controllers/ClientReviewController");

const router = express.Router();

router.route("/").get(getReview).post(AddReviewController);
router.route("/:id").delete(deleteReview).patch(UpdateReviewController).get(getReviewDetails)


module.exports = router;
