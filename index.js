const express = require('express');
const cors = require('cors');
const colors = require("colors")
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');



const BlogRoute = require('./Routes/BlogRoute')
const CategoryRoute = require('./Routes/CategoryRoute')
const ClientReviewRoute = require('./Routes/ClientReviewRoute') 
const TeamMembersRoute = require('./Routes/TeamMembersRoute')
const WorkProjectRoute = require('./Routes/WorkProjectsRoute')
const imageUploadRoute = require('./Routes/imageUploadRoute')
const skillRoute = require('./Routes/SkillRoute');
const serviceRoute = require('./Routes/ServiceRoute');



const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 9000;
const app = express();

const corsFonfig = {
    origin: true,
    credentials: true,
}
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))
app.use(express.json())


app.use(cors(corsFonfig));
app.options('*', cors(corsFonfig));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

// Database Connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        autoIndex: true
    }).then(() => console.log("Database connected successfully".bgRed.red.bold))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bgCyan.bold));

// Routes
app.get("/", (req, res) => res.send("Khaled portfolio server is running..."))
app.use('/api/v1/blog', BlogRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/clients-review', ClientReviewRoute);
app.use('/api/v1/team-members', TeamMembersRoute);
app.use('/api/v1/work-projects', WorkProjectRoute);
app.use('/api/v1/upload',imageUploadRoute)
app.use('/api/v1/skill',skillRoute);
app.use('/api/v1/service',serviceRoute);

//All
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

process.on('uncaughtException', err => {
    console.log(err);
    app.close(() => {
        process.exit(1);
    })
})


