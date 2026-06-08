import crypto from "crypto";

const DEFAULT_SECRET = "learnhub-dev-secret";

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
  const [salt, currentHash] = String(storedHash || "").split(":");

  if (!salt || !currentHash) {
    return false;
  }

  const calculatedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(currentHash, "hex"),
    Buffer.from(calculatedHash, "hex")
  );
};

const encode = (value) => Buffer.from(value).toString("base64url");
const decode = (value) => Buffer.from(value, "base64url").toString("utf8");

export const signToken = (payload, expiresInHours = 7 * 24) => {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  const header = encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expiresInHours * 60 * 60,
    })
  );

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token) => {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  const [header, body, signature] = String(token || "").split(".");

  if (!header || !body || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");

  if (expectedSignature !== signature) {
    return null;
  }

  const payload = JSON.parse(decode(body));

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
};
