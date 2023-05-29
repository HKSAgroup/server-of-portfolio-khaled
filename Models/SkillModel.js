const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        range:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const skill = mongoose.model("skill", skillSchema);

module.exports = skill;
