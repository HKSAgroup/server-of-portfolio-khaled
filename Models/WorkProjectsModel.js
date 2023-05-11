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
            type: [String],
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
        filter:{
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        introduction: {
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
