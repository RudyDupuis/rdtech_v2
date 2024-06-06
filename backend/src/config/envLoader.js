const dotenv = require("dotenv");
const path = require("path");

const localEnvPath = path.resolve(process.cwd(), ".env.local");
const localEnvExists = require("fs").existsSync(localEnvPath);

if (localEnvExists) {
  const localEnvConfig = dotenv.parse(require("fs").readFileSync(localEnvPath));
  for (const key in localEnvConfig) {
    process.env[key] = localEnvConfig[key];
  }
} else {
  console.warn(".env.local does not exist, using .env by default");
  dotenv.config();
}

module.exports = process.env;
