const express = require("express");
const router = express.Router();
const softSkillController = require("../../controllers/skills/softSkillController");
const { skillUpload } = require("../../middleswares/uploadMiddleware");

router.post(
  "/",
  skillUpload.single("svg"),
  softSkillController.createSoftSkill
);
router.get("/", softSkillController.getAllSoftSkills);
router.delete("/:id", softSkillController.deleteSoftSkill);
router.put(
  "/:id",
  skillUpload.single("svg"),
  softSkillController.updateSoftSkill
);

module.exports = router;
