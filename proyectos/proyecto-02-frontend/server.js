const fs = require("fs");
const http = require("http");
const path = require("path");

const projectRoot = __dirname;
const envFilePath = path.join(projectRoot, ".env");
const publicFiles = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/src/main.js", "src/main.js"],
  ["/src/styles.css", "src/styles.css"],
  ["/src/services/api.js", "src/services/api.js"],
  ["/src/utils/storage.js", "src/utils/storage.js"],
  ["/src/components/task-item.js", "src/components/task-item.js"]
]);

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

const port = Number(process.env.PORT || 4173);
const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000";

function getContentType(filePath) {
  if (filePath.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }

  if (filePath.endsWith(".js")) {
    return "application/javascript; charset=utf-8";
  }

  if (filePath.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }

  return "text/plain; charset=utf-8";
}

function send(response, statusCode, body, contentType) {
  response.writeHead(statusCode, {
    "Content-Type": contentType
  });
  response.end(body);
}

function handleConfig(response) {
  const configBody = `window.APP_CONFIG = ${JSON.stringify({ apiBaseUrl })};`;
  send(response, 200, configBody, "application/javascript; charset=utf-8");
}

function handleFile(response, filePath) {
  if (!fs.existsSync(filePath)) {
    send(response, 404, "Archivo no encontrado.", "text/plain; charset=utf-8");
    return;
  }

  const fileContent = fs.readFileSync(filePath);
  send(response, 200, fileContent, getContentType(filePath));
}

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  if (pathname === "/config.js") {
    handleConfig(response);
    return;
  }

  const relativePath = publicFiles.get(pathname);

  if (!relativePath) {
    send(response, 404, "Ruta no encontrada.", "text/plain; charset=utf-8");
    return;
  }

  handleFile(response, path.join(projectRoot, relativePath));
});

server.listen(port, () => {
  console.log(`Frontend escuchando en http://localhost:${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
