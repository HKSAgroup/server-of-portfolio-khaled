const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.fileUpload = catchAsyncErrors(async (req, res) => {
    try {
        res.json({
            status: "success",
            url: `https://backend.lobdho.com/blog/images/${req.file.filename}`,
            // url: `${process.env.MULTER_URL}/${req.file.filename}`,
        });
    } catch (err) { }
})
exports.multiFileUploads = catchAsyncErrors(async (req, res) => {
    try {
        const imageUrl = [];
        req.files.forEach((img) => {
            imageUrl.push(`${process.env.MULTER_URL}/${img.filename}`);
        });
        res.status(200).json({
            status: "success",
            imageURLs: imageUrl,
        });
    } catch (err) { }
})
