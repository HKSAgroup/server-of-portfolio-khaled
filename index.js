const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');



const BlogRoute = require('./Routes/BlogRoute')
const UserRoute = require('./Routes/UserRoute')
const CategoryRoute = require('./Routes/CategoryRoute')
const imageUploadRoute = require('./Routes/imageUploadRoute')
const AdBannerRoute = require('./Routes/AdBannerRoute')




const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 8000;
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
mongoose.connect(process.env.DATABASE_LOCAL,
    {
        useNewUrlParser: true,
        autoIndex: true
    }).then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Routes
app.get("/", (req, res) => res.send("Blog site server is running..."))
app.use('/api/v1/auth/user', UserRoute);
app.use('/api/v1/blog', BlogRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/upload',imageUploadRoute)
app.use('/api/v1/ad-banner', AdBannerRoute);

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

