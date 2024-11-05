const User = require("../../../models/User");

const undoDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {
      $set: {
        deleted: false,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.undoDeleteUser = undoDeleteUser;
