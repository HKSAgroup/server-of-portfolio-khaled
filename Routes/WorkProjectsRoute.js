

const express = require("express");
const { getProjects, AddProjectController, deleteProject, UpdateProject, getProjectDetails } = require("../Controllers/WokProjectsController");


const router = express.Router();

router.route("/").get(getProjects).post(AddProjectController);
router.route("/:id").delete(deleteProject).patch(UpdateProject).get(getProjectDetails)


module.exports = router;
