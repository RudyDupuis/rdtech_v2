const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/sequelize");
const hardSkillRoutes = require("./src/routes/hardSkillRoutes");
const softSkillRoutes = require("./src/routes/softSkillRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/hard-skills", hardSkillRoutes);
app.use("/soft-skills", softSkillRoutes);

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
