const AdMember = require("../Models/TeamMembersModel");


exports.AddMemberController = (req, res) => {

    const adMember = new AdMember(req.body);
    adMember.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save member in DB"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            adMember
        });
    });
}

exports.getMembers = (req, res) => {

    AdMember.find().exec((err, adMember) => {
        if (err) {
            return res.status(400).json({
                error: "Member not found"
            });
        }
        res.json(adMember);
    }
    );
}

// get portfolio details
exports.getMemberDetails = (req, res) => {
    //  get all banner
    const id = req.params.id

    const portFolio = AdMember.findById(id).exec((err, adMember) => {
        if (err) {
            return res.status(400).json({
                error: "Member not found"
            });
        }
        res.json(adMember);
    }
    );

}

exports.deleteMember = (req, res) => {
    //  delete category
    const id = req.params.id
    AdMember.findByIdAndDelete(id).exec((err, adMember) => {
        if (err) {
            return res.status(400).json({
                error: "Portfolio not found"
            });
        }
        res.json(adMember);
    }
    );
}

// update portfolio 
exports.UpdateMemberController = (req, res) => {
    // update portfolio
    const id = req.params.id

    const { image, title, name} = req.body

    AdMember.findByIdAndUpdate(id, { image, title, name }, { new: true }).exec((err, adMember) => {
        if (err) {
            return res.status(400).json({
                error: "Member not found"
            });
        }
        res.json({
            status: "success",
            message: "data updated successfully!",
            adMember
        });
    }
    );
}