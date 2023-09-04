const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
    destination: (req, file, cb) => {
        if (file.fieldname == "photo") {
            cb(null, "public/photos")
        } if (file.fieldname == "gallery") {
            cb(null, "public/gallery")
        }
    }

});
module.exports = storage;