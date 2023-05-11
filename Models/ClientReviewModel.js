const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        publishDate: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

const ClientReview = mongoose.model("ClientReview", projectSchema);

module.exports = ClientReview;
