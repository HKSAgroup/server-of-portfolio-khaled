const AdProject = require("../Models/WorkProjectsModel");

exports.getProjectService = async (filters, queries) => {
    const projects = await AdProject.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sort)
  
    const total = await AdProject.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, projects };
  };