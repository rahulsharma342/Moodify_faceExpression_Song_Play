const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  try {
    // 🔎 Check if token is blacklisted in Redis
    const isBlacklisted = await redis.get(token);

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token expired or logged out",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { authMiddleware };