const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const trainingExperienceController = require("../../controllers/experiences/trainingExperienceController");
const router = express.Router();
const { authenticateToken } = require("../../middleswares/authMiddleware");

router.post(
  "/",
  experienceUpload.single("thumbnail"),
  authenticateToken,
  trainingExperienceController.createTrainingExperience
);
router.get("/", trainingExperienceController.getAllTrainingExperiences);
router.delete(
  "/:id",
  authenticateToken,
  trainingExperienceController.deleteTrainingExperience
);
router.put(
  "/:id",
  experienceUpload.single("thumbnail"),
  authenticateToken,
  trainingExperienceController.updateTrainingExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  authenticateToken,
  trainingExperienceController.removeTrainingExperienceImage
);

module.exports = router;
