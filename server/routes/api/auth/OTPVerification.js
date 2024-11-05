const otpgenerator = require("otp-generator");
const OTP = require("../../../models/OTP");
const { sendEmail } = require("../../../utils/sendEmail");
const Account = require("../../../models/Account");

const OTPVerification = async (req, res) => {
  try {
    const { id } = req.user;
    const account = await Account.findById(id);
    if (!account) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const targetemail = account.email;
    const otp = otpgenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    // const newOTP = new OTP({ email: targetemail, otp: otp });
    // await newOTP.save();
    await OTP.findOneAndUpdate(
      { email: targetemail },
      { email: targetemail, otp: otp },
      {
        new: true,
        upsert: false,
      }
    );
    const options = {
      to: targetemail,
      subject: `Your verification code is ${otp}`,
      text: "code",
      html: `<h1>Verify your email address</h1>
          <hr><h3>Please enter this 4-digit code to access our platform.</h3>
          <h1>${otp}</h1>`,
    };
    const result = await sendEmail(options);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { code } = req.body;

    const { id } = req.user;

    const account = await Account.findById(id);

    if (!account) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingOTP = await OTP.findOne({ email: account.email, otp: code });

    if (existingOTP) {
      // OTP is valid
      await OTP.findOneAndDelete({ email: account.email, otp: code });
      await Account.findByIdAndUpdate(id, { verified: true });
      res.status(200).json({
        success: true,
        role: req.user.role,
        message: "OTP verification successful",
      });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.verifyOTP = verifyOTP;

exports.OTPVerification = OTPVerification;
