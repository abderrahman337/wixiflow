const jwt = require("jsonwebtoken");
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(refreshToken, "refreshSecret", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    const jwtPayload = {
      id: user.id,
    };

    const accessToken = jwt.sign(jwtPayload, "secret", {
      expiresIn: "30m",
    });
    return res.json({ accessToken });
  });
};

exports.refreshToken = refreshToken;
