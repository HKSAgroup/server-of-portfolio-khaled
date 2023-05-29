const express = require("express");
const { getSkill, addSkill, getSkillDetails, deleteSkill, updateSkill } = require("../Controllers/SkillController");
const router = express.Router();


router.route('/', getSkill).post(addSkill)
router.route('/:id').get(getSkillDetails).delete(deleteSkill).put(updateSkill)

module.exports = router;