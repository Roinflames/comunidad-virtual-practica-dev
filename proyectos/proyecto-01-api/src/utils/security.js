const crypto = require("crypto");
const { promisify } = require("util");

const scrypt = promisify(crypto.scrypt);

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
  const [salt, hash] = String(storedHash || "").split(":");

  if (!salt || !hash) {
    return false;
  }

  const derivedKey = await scrypt(password, salt, 64);
  const hashBuffer = Buffer.from(hash, "hex");

  if (hashBuffer.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashBuffer, derivedKey);
}

function createToken(payload, secret, expiresInSeconds) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const issuedAt = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: issuedAt,
    exp: issuedAt + expiresInSeconds
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedBody}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${signature}`;
}

function verifyToken(token, secret) {
  const parts = String(token || "").split(".");

  if (parts.length !== 3) {
    throw new Error("Token invalido.");
  }

  const [encodedHeader, encodedBody, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedBody}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const actualSignatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    actualSignatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(actualSignatureBuffer, expectedSignatureBuffer)
  ) {
    throw new Error("Token invalido.");
  }

  const payload = JSON.parse(base64UrlDecode(encodedBody));

  if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Token expirado.");
  }

  return payload;
}

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  verifyToken
};
