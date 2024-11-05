const nodemailer = require("nodemailer");

require("dotenv").config();
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      authMethod: "LOGIN",
    });

    const mailOptions = {
      // from: process.env.SMPT_MAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };
    // console.log("transporter ==>", transporter);
    // console.log("mailOptions==>", mailOptions);
    await transporter.sendMail(mailOptions);
    return {
      result: true,
      message: "Reset link is sent to you. Please check in your inbox.",
    };
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = sendEmail;
