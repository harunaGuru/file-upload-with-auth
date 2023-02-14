const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Content");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: Storage }).single("file");

const upload = multer({
  storage: Storage,
  limits: { fileSize: 100000 * 100 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|mp4|mkv|flv|mov|wmv|gif/;
    //const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (extname) {
      return cb(null, true);
    }
    cb("Give the proper File format to upload");
  },
}).single("file");

module.exports = upload;
