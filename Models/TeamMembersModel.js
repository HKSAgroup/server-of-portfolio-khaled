const mongoose = require("mongoose");

const adMemberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title:{
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

const AdMember = mongoose.model("AdMember", adMemberSchema);

module.exports = AdMember;
