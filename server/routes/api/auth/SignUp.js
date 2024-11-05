const bcryptjs = require("bcryptjs");
const User = require("../../../models/User");
const validateSignUpInput = require("../../../validation/Register");
const jwt = require("jsonwebtoken");
const Subscription = require("../../../models/Subscription");
const SignUp = async (req, res, next) => {

  console.log("console sign up page!!")
  try {
    const { isValid, errors } = validateSignUpInput(req.body);
    console.log(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    const account = await User.findOne({ email: email });

    if (account) {
      errors.email = "Email already exist!";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      email: email,
      password: password,
    });

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    newUser.password = hash;

    const newSubscription = new Subscription({
      total: 0,
      remain: 0,
    });
    const subscription = await newSubscription.save();
    newUser.subscription = subscription._id;
    await newUser.save();

    next();
  } catch (error) {
    console.log(error);
  }
};

exports.SignUp = SignUp;
