const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path:{
        type: String,   
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    review:[
        {
            name:{
                type: String,
            },
            title:{
                type: String,
            },
            img:{
                type: String,
            },
            content:{
                type: String,
            }
        }
    ]
}
)

const Service = mongoose.model("Service", servicesSchema);

module.exports = Service;