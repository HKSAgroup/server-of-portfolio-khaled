const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        path: {
            type: String,
        },
        client: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const AdProject = mongoose.model("AdProject", projectSchema);

module.exports = AdProject;
