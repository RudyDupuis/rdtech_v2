const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const projectExperienceController = require("../../controllers/experiences/projectExperienceController");
const router = express.Router();
const { authenticateToken } = require("../../middleswares/authMiddleware");

router.post(
  "/",
  experienceUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  authenticateToken,
  projectExperienceController.createProjectExperience
);
router.get("/", projectExperienceController.getAllProjectExperiences);
router.delete(
  "/:id",
  authenticateToken,
  projectExperienceController.deleteProjectExperience
);
router.put(
  "/:id",
  experienceUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  authenticateToken,
  projectExperienceController.updateProjectExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  authenticateToken,
  projectExperienceController.removeProjectExperienceImage
);
router.get(
  "/favorites",
  projectExperienceController.getAllFavoriteProjectExperiences
);
router.get("/:id", projectExperienceController.getProjectExperienceById);

module.exports = router;
