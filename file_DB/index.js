const express = require("express");
const app = express();

const cors = require("cors");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect DB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test")
        console.log("DB connect succesfull.")
    } catch (error) {
        console.log("DB connect failed.");
        console.log(error);
        process.exit(1)
    }
}


// file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

// Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "user name is redquired"]
        },
        image: {
            type: String,
            required: [true, "user image is redquired"]
        }
    }
)

const User = mongoose.model("User", userSchema);

// route
app.get('/', (req, res) => {
    res.status(200).send("Wellcome to my server.")
})

app.get('/register', (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html")
})

app.post('/register', upload.single("image"), async (req, res) => {

    try {
        const newUser = await new User({
            name: req.body.name,
            image: req.file.filename
        })
        await newUser.save();
        res.status(201).json({
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

const port = 5000;

app.listen(port, () => {
    console.log("server is running on", port)
    connectDB();
})