const express = require("express");
const router = express.Router();
const hardSkillController = require("../../controllers/skills/hardSkillController");
const { skillUpload } = require("../../middleswares/uploadMiddleware");

router.post(
  "/",
  skillUpload.single("svg"),
  hardSkillController.createHardSkill
);
router.get("/", hardSkillController.getAllHardSkills);
router.delete("/:id", hardSkillController.deleteHardSkill);
router.put(
  "/:id",
  skillUpload.single("svg"),
  hardSkillController.updateHardSkill
);

module.exports = router;
