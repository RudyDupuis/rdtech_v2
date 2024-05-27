const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const skillUpload = require("../middleswares/uploadMiddleware");

router.post("/skills", skillUpload.single("svg"), skillController.createSkill);
router.get("/skills", skillController.getSkills);
router.delete("/skills/:id", skillController.deleteSkill);

module.exports = router;
