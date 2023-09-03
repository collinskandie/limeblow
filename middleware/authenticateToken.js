const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return next(); // No token, continue without setting req.user
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return next(); // Invalid token, continue without setting req.user
    }

    req.user = user; // Set req.user with user information
    next();
  });
}

module.exports = authenticateToken;
