//app create
const express = require("express");
const app = express();

//port find karna
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

// db connect
const db = require("./config/database");
db.connect();

// cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mount the api route
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT , () => {
    console.log(`App is running smoothly at ${PORT}`);
})