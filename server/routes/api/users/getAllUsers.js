const User = require("../../../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("subscription")
      .select("email deleted subscription");

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getAllUsers = getAllUsers;
