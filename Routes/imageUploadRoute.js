
const express = require("express");
const router = express.Router();
const imageUploadController = require("../Controllers/imageUploadController");
const uploader = require("../middleware/uploader");

router.post(
    "/single-image-upload",
    uploader.single("image"),
    imageUploadController.fileUpload
);
router.post(
    "/multi-image-upload",
    uploader.array("image"),
    imageUploadController.multiFileUploads
);

module.exports = router;
