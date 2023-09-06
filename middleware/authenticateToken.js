const { default: axios } = require("axios");
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
const generateToken = async (req, res, next) => {
  const secrete = process.env.MPESA_CONSUMER_SECRETE;
  const consumer_key = process.env.MPESA_CONSUMER_KEY;
  const auth = new Buffer.from(`${consumer_key}:${secrete}`).toString("base64");

  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((resp) => {
      token = resp.data.access_token;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error.message);
    });
};

module.exports = {
  authenticateToken,
  generateToken,
};
