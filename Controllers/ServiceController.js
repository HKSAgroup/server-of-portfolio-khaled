const Service = require("../Models/ServicesModel");


exports.addServices = async (req, res) => {

    const service = new Service(req.body);

    service.save((err, service) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save service in DB"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            service
        });
    }
    );
}

exports.getServices = async (req, res) => {
    Service.find().exec((err, service) => {
        if (err) {
            return res.status(400).json({
                error: "Service not found"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            data: service
        });
    }
    );
}

exports.getServiceDetails = async (req, res) => {
    const id = req.params.id
    const service = Service.findById(id).exec((err, service) => {
        if (err) {
            return res.status(400).json({
                error: "Service not found"
            });
        }
        res.json({
            status: "success",
            message: "data inserted successfully!",
            data: service
        });
    }
    );
}

exports.deleteService = async (req, res) => {
    const id = req.params.id
    Service.findByIdAndDelete(id).exec((err, service) => {
        if (err) {
            return res.status(400).json({
                error: "Service not found"
            });
        }
        res.json({
            status: "success",
            message: "data deleted successfully!",
        });
    }
    );
}


exports.updateService = async (req, res) => {
    const id = req.params.id

    // put data in database

    Service.findByIdAndUpdate(id, req.body, { new: true }, (err, service) => {
        if (err) {
            return res.status(400).json({
                error: "Service not found"
            });
        }
        res.json({
            status: "success",
            message: "data updated successfully!",
            data: service
        });
    }
    );
}