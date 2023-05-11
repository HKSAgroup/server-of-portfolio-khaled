const AdProject = require("../Models/WorkProjectsModel");
const { getProjectService } = require("../services/project.services");



exports.AddProjectController = (req, res) => {
    //    post category
    const project = new AdProject(req.body);
    project.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save project in DB"
            });
        } 
        res.json({
            status: "success",
            message: "data inserted successfully!",
            project
        });
    });
}

exports.getProjects = async (req, res) => {

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

        const project = await getProjectService(filters, queries);

        res.status(200).json({
            status: "success",
            data: project,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }

    //  get all banner
    // AdProject.find().exec((err, project) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: "Project not found"
    //         });
    //     }
    //     res.json(project);
    // }
    // );
}


exports.getProjectDetails = (req, res) => {
    //  get all banner
    const id = req.params.id

    const portFolio = AdProject.findById(id).exec((err, project) => {
        if (err) {
            return res.status(400).json({
                error: "Portfolio not found"
            });
        }
        res.json(project);
    }
    );

}

exports.deleteProject = (req, res) => {
    //  delete category
    const id = req.params.id
    AdProject.findByIdAndDelete(id).exec((err, project) => {
        if (err) {
            return res.status(400).json({
                error: "Portfolio not found"
            });
        }
        res.json(project);
    }
    );
}

// update portfolio 
exports.UpdateProject = (req, res) => {

    const id = req.params.id

    const { image, title, path, client, tags, category, introduction, filter } = req.body

    AdProject.findByIdAndUpdate(id, { image, title, path, client, tags, filter, category, introduction }, { new: true }).exec((err, project) => {
        if (err) {
            return res.status(400).json({
                error: "Portfolio not found"
            });
        }
        res.json({
            status: "success",
            message: "data updated successfully!",
            adPortfolio: project
        });
    }
    );
}