const multer = require("multer");

const skillStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/skills");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const skillUpload = multer({ storage: skillStorage });

module.exports = skillUpload;
