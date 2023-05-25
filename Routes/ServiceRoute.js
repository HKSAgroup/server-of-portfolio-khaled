const express = require("express");
const { getServices, addServices, getServiceDetails, deleteService, updateService } = require("../Controllers/ServiceController");

const router = express.Router();


router.route("/").get(getServices).post(addServices)
router.route("/:id").get(getServiceDetails).delete(deleteService).patch(updateService)

module.exports = router;