const express = require("express");
const router = express.Router();

const { SignUp } = require("../../api/auth/SignUp");
const { SignIn } = require("../../api/auth/Signin");
const { refreshToken } = require("../../api/auth/refreshToken");
const { googleSignIn } = require("../../api/auth/googleSignIn");
const { googleSignUp } = require("../../api/auth/googleSignUp");
const { forgotPassword } = require("../../api/auth/forgotPassword");
const {
  forgotPasswordVerifyToken,
} = require("../../api/auth/forgotPasswordVerifyToken");
const { resetPassword } = require("../../api/auth/resestPassword");
const {
  getLinkedinAccessToken,
} = require("../../api/auth/getLinkedinAccessToken");
/**
 * @router      Metohd : GET   endpoint : v1/auth/test
 * @access      Public
 * @return      Test message
 */
router.get("/test", async (req, res) => {
  return res.status(200).json({ msg: "Router is working" });
});

/**
 *@router      Metohd : POST   endpoint : api/auth/refresh-token
 *@access      Public
 *@payload     name, email, password, role,
 *@return      if success then return signin data(token) else return errors
 */
router.post("/refresh-token", refreshToken);

/**
 *@router      Metohd : POST   endpoint : api/auth/register
 *@access      Public
 *@payload     name, email, password, role,
 *@return      if success then return signin data(token) else return errors
 */

router.post("/signup", SignUp);
/**
 *@router      Metohd : POST   endpoint : api/auth/register
 *@access      Public
 *@payload     name, email, password, role,
 *@return      if success then return signin data(token) else return errors
 */
router.post("/google-signup", googleSignUp);

/**
 *@router      Metohd : POST   endpoint : api/auth/login
 *@access      Public
 *@payload     email, password,
 *@return      if success then return jwt token else return errors
 */
router.post("/signin", SignIn);

/**
 *@router      Metohd : POST   endpoint : api/auth/google-signin
 *@access      Public
 *@payload     accessToken,
 *@return      if success then return jwt token else return errors
 */
router.post("/google-signin", googleSignIn);
/**
 *@router      Metohd : POST   endpoint : api/auth/forgot-password
 *@access      Public
 *@payload     email,
 *@return      if success then return jwt token else return errors
 */
router.post("/forgot-password", forgotPassword);
/**
 *@router      Metohd : POST   endpoint : api/auth/forgot-password
 *@access      Public
 *@payload     token,
 *@return      if success then return jwt token else return errors
 */
router.post("/forgot-password-verify-token", forgotPasswordVerifyToken);
/**
 *@router      Metohd : POST   endpoint : api/auth/reset-password
 *@access      Public
 *@payload     email, password,
 *@return      if success then return jwt token else return errors
 */
router.post("/reset-password", resetPassword);
/**
 *@router      Metohd : GET   endpoint : api/auth/get-linkedin-access-token
 *@access      Public
 *@payload     code,
 *@return      if success then return jwt token else return errors
 */
router.post("/get-linkedin-access-token", getLinkedinAccessToken);

/**
 *@router      Metohd : POST   endpoint : api/auth/send-verification-email-code
 *@access      Private
 *@payload     JWT Token in authorization
 *@return      if success then send otp code to user email
 */
// router.post(
//   "/send-verification-email-code",
//   validateAuthorization,
//   OTPVerification
// );
/**
 *@router      Metohd : POST   endpoint : v1/auth/verify-email-code
 *@access      Private
 *@payload     otp,
 *@return      if success then return status 200 code
 */
// router.post("/verify-email-code", validateAuthorization, verifyOTP);

module.exports = router;
