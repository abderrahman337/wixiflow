const axios = require("axios");
// const queryString = require("query-string");
const getLinkedinAccessToken = async (req, res) => {
  try {
    const { code } = req.body;
    console.log("code==>", code);
    console.log("code==>", process.env.LINKEDIN_REDIRECT_URI);
    console.log("code==>", process.env.LINKEDIN_CLIENT_ID);
    console.log("code==>", process.env.LINKEDIN_CLIENT_SECRET);

    const urlparams = new URLSearchParams();
    urlparams.append("grant_type", "authorization_code");
    urlparams.append("code", code);
    urlparams.append("redirect_uri", `${process.env.LINKEDIN_REDIRECT_URI}`);
    urlparams.append("client_id", process.env.LINKEDIN_CLIENT_ID);
    urlparams.append("client_secret", process.env.LINKEDIN_CLIENT_SECRET);
    // const params = {
    //   grant_type: "authorization_code",
    //   code: code,
    //   redirect_uri: `${process.env.LINKEDIN_REDIRECT_URI}`,
    //   client_id: process.env.LINKEDIN_CLIENT_ID,
    //   client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    // };

    // const query = queryString.stringify(params);
    // const response = await fetch(
    //   `https://www.linkedin.com/oauth/v2/accessToken`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(params),
    //   }
    // );
    // const data = await response.json();
    // return res.status(200).json(data);
    // const response = await axios.post(
    //   `https://www.linkedin.com/oauth/v2/accessToken`,
    //   params,
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );
    const response = await fetch(
      `https://www.linkedin.com/oauth/v2/accessToken`,
      {
        method: "POST",
        body: urlparams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.ok) {
      console.log("response==>", response.json());
      return res.status(200).json(response.json());
    } else {
      return res.status(400).json({ message: "Failed to get access token" });
    }
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getLinkedinAccessToken };
