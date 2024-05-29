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
const experienceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/experiences");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const skillUpload = multer({ storage: skillStorage });
const experienceUpload = multer({ storage: experienceStorage });

module.exports = { skillUpload, experienceUpload };
