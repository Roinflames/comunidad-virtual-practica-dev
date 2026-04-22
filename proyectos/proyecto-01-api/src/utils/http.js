function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sendSuccess(response, statusCode, data, message) {
  sendJson(response, statusCode, {
    success: true,
    data,
    message
  });
}

function sendError(response, statusCode, error) {
  sendJson(response, statusCode, {
    success: false,
    error,
    code: statusCode
  });
}

function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

async function parseJsonBodyOrSendError(request, response) {
  try {
    return await parseJsonBody(request);
  } catch (_error) {
    sendError(response, 400, "El body debe ser JSON valido.");
    return null;
  }
}

module.exports = {
  parseJsonBodyOrSendError,
  sendError,
  sendJson,
  sendSuccess
};
