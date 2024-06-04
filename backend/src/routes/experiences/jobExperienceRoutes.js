const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const jobExperienceController = require("../../controllers/experiences/jobExperienceController");
const router = express.Router();
const { authenticateToken } = require("../../middleswares/authMiddleware");

router.post(
  "/",
  experienceUpload.single("thumbnail"),
  authenticateToken,
  jobExperienceController.createJobExperience
);
router.get("/", jobExperienceController.getAllJobExperiences);
router.delete(
  "/:id",
  authenticateToken,
  jobExperienceController.deleteJobExperience
);
router.put(
  "/:id",
  experienceUpload.single("thumbnail"),
  authenticateToken,
  jobExperienceController.updateJobExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  authenticateToken,
  jobExperienceController.removeJobExperienceImage
);

module.exports = router;
