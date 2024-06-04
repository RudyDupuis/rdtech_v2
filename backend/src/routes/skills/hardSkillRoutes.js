const express = require("express");
const router = express.Router();
const hardSkillController = require("../../controllers/skills/hardSkillController");
const { skillUpload } = require("../../middleswares/uploadMiddleware");
const { authenticateToken } = require("../../middleswares/authMiddleware");

router.post(
  "/",
  skillUpload.single("svg"),
  authenticateToken,
  hardSkillController.createHardSkill
);
router.get("/", hardSkillController.getAllHardSkills);
router.delete("/:id", authenticateToken, hardSkillController.deleteHardSkill);
router.put(
  "/:id",
  skillUpload.single("svg"),
  authenticateToken,
  hardSkillController.updateHardSkill
);

module.exports = router;
