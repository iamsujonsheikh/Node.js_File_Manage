const multer = require("multer");
const storage = require("../utils/multerStorage");

const studentFile = multer({
    storage,
}).fields([
    { name: "photo", maxCount: 1 },
    { name: "gallery", maxCount: 3 }
])
module.exports = studentFile;