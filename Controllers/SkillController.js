const skill = require("../Models/SkillModel");


exports.addSkill = (req, res) => {

    const skillSet = new skill(req.body)

    skillSet.save((err, skill) => {
        if (err) {
            return res.status(400).json({
                error: "Skill not found"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            data: skill
        });
    });
}

exports.getSkill = (req, res) => {

    skill.find().exec((err, skill) => {
        if (err) {
            return res.status(400).json({
                error: "Skill not found"
            });
        }
        res.json({
            status: "success",
            message: "data get successfully!",
            data: skill
        });
    }
    );
}

exports.getSkillDetails = (req, res) => {
    //  get all banner
    const id = req.params.id

    const skill = skill.findById(id).exec((err, skill) => {
        if (err) {
            return res.status(400).json({
                error: "Skill not found"
            });
        }
        res.json({
            status: "success",
            message: "data get successfully!",
            data: skill
        });
    }
    );

}

exports.deleteSkill = (req, res) => {
    //  delete category
    const id = req.params.id
    skill.findByIdAndDelete(id).exec((err, skill) => {
        if (err) {
            return res.status(400).json({
                error: "Skill not found"
            });
        }
        res.json({
            status: "success",
            message: "data deleted successfully!",
            data: skill
        });
    }
    );

}

exports.updateSkill = (req, res) => {
    const id = req.params.id

    skill.findByIdAndUpdate(id, req.body, { new: true }, (err, skill) => {
        if (err) {
            return res.status(400).json({
                error: "Skill not found"
            });
        }
        res.json({
            status: "success",
            message: "data updated successfully!",
            data: skill
        });
    }
    );
}