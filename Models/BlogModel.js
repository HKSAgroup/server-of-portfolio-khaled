const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        path:{
            type: String,
        },
        authorName: {
            type: String,
            required: true
        },
        publishDate: {
            type: Date,
            default: Date.now
        },
        tags: {
            type: [String],
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        clickCounter:{
            type: Number,
            default: 0
        },
        comments: [
            {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                content: {
                    type: String,
                },
                status: {
                    type: Boolean,
                    default: false
                },
                publishDate: {
                    type: Date,
                    default: Date.now
                },
                blogId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Blog"
                },
            }
        ]
        // comment: {
        //     type: Array,
        //     items: [
        //         {
        //             type: Object,
        //             properties: {
        //                 user: {
        //                     type: Object,
        //                     properties: {
        //                         name: {
        //                             type: String
        //                         },
        //                         avatar: {
        //                             type: String
        //                         },
        //                         email: {
        //                             type: String
        //                         },
        //                         _id: {
        //                             type: String
        //                         },
        //                     },
        //                 },
        //                 publicDate: {
        //                     type: Date,
        //                     default: Date.now
        //                 },
        //                 favourite: {
        //                     type: Number
        //                 },
        //                 shared: {
        //                     type: Number
        //                 },
        //                 content: {
        //                     type: String
        //                 },
        //                 replies: {
        //                     type: Array,
        //                     items: [
        //                         {
        //                             type: Object,
        //                             properties: {
        //                                 user: {
        //                                     type: Object,
        //                                     properties: {
        //                                         name: {
        //                                             type: String
        //                                         },
        //                                         avatar: {
        //                                             type: String
        //                                         },
        //                                         email: {
        //                                             type: String
        //                                         },
        //                                         _id: {
        //                                             type: String
        //                                         },
        //                                     },
        //                                 },
        //                                 publicDate: {
        //                                     type: Date,
        //                                     default: Date.now
        //                                 },
        //                                 favourite: {
        //                                     type: Number
        //                                 },
        //                                 shared: {
        //                                     type: Number
        //                                 },
        //                                 content: {
        //                                     type: String
        //                                 },
        //                             }
        //                         }
        //                     ]
        //                 }
        //             },
        //         },
        //     ]

        // }
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
