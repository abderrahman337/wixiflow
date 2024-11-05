const jwt = require("jsonwebtoken");

const validateAuthorization = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken)
      return res.status(401).json({ error: "No token or token expired" });
    const token = bearerToken.substr(7, bearerToken.length);
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return res.status(401).json({ error: "Token is not invalid." });

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = validateAuthorization;
