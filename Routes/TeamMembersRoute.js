const express = require("express");

const { getMembers, AddMemberController, deleteMember, UpdateMemberController, getMemberDetails } = require("../Controllers/TeamMembersController");


const router = express.Router();

router.route("/").get(getMembers).post(AddMemberController);
router.route("/:id").delete(deleteMember).patch(UpdateMemberController).get(getMemberDetails)


module.exports = router;
