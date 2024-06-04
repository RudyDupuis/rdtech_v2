const express = require("express");
const router = express.Router();
const softSkillController = require("../../controllers/skills/softSkillController");
const { skillUpload } = require("../../middleswares/uploadMiddleware");
const { authenticateToken } = require("../../middleswares/authMiddleware");

router.post(
  "/",
  skillUpload.single("svg"),
  authenticateToken,
  softSkillController.createSoftSkill
);
router.get("/", softSkillController.getAllSoftSkills);
router.delete("/:id", authenticateToken, softSkillController.deleteSoftSkill);
router.put(
  "/:id",
  skillUpload.single("svg"),
  authenticateToken,
  softSkillController.updateSoftSkill
);

module.exports = router;
