const express = require('express');
const app = express();
const cors = require('cors');
const studentFile = require('./middleware/multer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder.
app.use(express.static("public"));

// Home route.
app.get('/', (req, res) => {
    res.status(200).send("Hey awesome people.")
});

// Home route.
app.post('/student', studentFile, (req, res) => {
    const result = req.body;
    res.json({ result });
});

// Client site error.
app.use((req, res, next) => {
    res.status(404).send("Not found.")
});

// Server site error.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internel error."
    })
});
module.exports = app;