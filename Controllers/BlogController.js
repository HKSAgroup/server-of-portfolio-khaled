const Blog = require("../Models/BlogModel");
const { createBlogService, getBlogService, getBlogByIdService, deleteBlogByIdService, updateBlogByIdService, blogCommentService, getBlogByTitle, getBlogByPathService } = require("../services/blog.services");
const { patchBlogCommentService, deleteBlogCommentService } = require("../services/patchBlogCommentService");


exports.getBlogs = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludesFields = ["limit", "page", "sort", "fields", "search"];

    excludesFields.forEach((field) => {
      delete filters[field];
    });



    let filterString = JSON.stringify(filters);

    filterString = filterString.replace(
      /\b(gt|lt|gte|lte|regex)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);


    let queries = {};

    if (req.query.limit | req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skipCategory = (page - 1) * +limit;
      queries.skip = skipCategory;
      queries.limit = +limit;
    }

    if (req.query.sort) {
      let sortCateory = req.query.sort;
      sortCateory = sortCateory.split(",").join(" ");
      queries.sort = sortCateory;
    }

    if (req.query.fields) {
      let selectCategory = req.query.fields.split(",").join(" ");
      queries.fields = selectCategory;
    }


    if (req.query.search) {
      let serachQuery = req.query.search;
      queries.search = serachQuery;
    }

    const blogs = await getBlogService(filters, queries);

    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};


exports.createBlog = async (req, res) => {
  try {
    const newBlog = await createBlogService(req.body);

    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted ",
      error: error.message,
    });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogByIdService(id);

    const blogData = await Blog.findById(req.params.id);

    // if (!blog) {
    //   return next(new ErrorHander("Blog not found", 404));
    // }

    if (blog) {
      blogData.clickCounter += 1;
      await blogData.save();
    }

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getBlogByPath = async (req, res) => {
  try {
    const id = req.params.path;
    const blog = await getBlogByPathService(id);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await deleteBlogByIdService(id);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "failed to blog delete",
      error: error.message,
    });
  }
};

exports.updateBlogByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const blog = await updateBlogByIdService(id, body);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to update Blog",
      error: error.message,
    });
  }
};

// push comment to blog by blog id

exports.blogCommentController = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const blog = await blogCommentService(id, body);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to update Blog",
      error: error.message,
    });
  }
}

// patch blog comment by comment id

exports.patchBlogCommentController = async (req, res) => {

  try {
    const id = req.params.id;
    const body = req.body;
    const blog = await patchBlogCommentService(id, body);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to update Blog",
      error: error.message,
    });
  }
}


exports.deleteBlogCommentController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await deleteBlogCommentService(id);

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to update Blog",
      error: error.message,
    });
  }
}