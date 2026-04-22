const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..", "..");
const envFilePath = path.join(projectRoot, ".env");

function loadEnvFile() {
  if (!fs.existsSync(envFilePath)) {
    return;
  }

  const fileContent = fs.readFileSync(envFilePath, "utf8");
  const lines = fileContent.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

function toAbsoluteDatabasePath(databaseUrl) {
  if (!databaseUrl) {
    return path.join(projectRoot, "db", "proyecto-01-api.sqlite");
  }

  return path.isAbsolute(databaseUrl) ? databaseUrl : path.join(projectRoot, databaseUrl);
}

const config = {
  port: Number(process.env.PORT || 3000),
  databasePath: toAbsoluteDatabasePath(process.env.DATABASE_URL),
  jwtSecret: process.env.JWT_SECRET || "cambia-este-secreto",
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN || 3600),
  hasCustomJwtSecret: Boolean(process.env.JWT_SECRET),
  projectRoot
};

module.exports = {
  config
};
