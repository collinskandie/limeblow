// tokenValidator.js

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETE;

function validateToken(req, res, next) {
  const token = req.headers.authorization; // Assuming token is sent in the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach the decoded user to the request object
    next(); // Continue with the next middleware or route
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid or has expired" });
  }
}

module.exports = { validateToken };
