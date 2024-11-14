const User = require("../../../models/User");
const Subscription = require("../../../models/Subscription");
const addPlan = async (req, res) => {
  try {
    const { name, total, plan } = req.body;

    const user = await User.findById(req.user.id);

    console.log("add plan!!!")
    // console.log(req.body);
    // console.log(req.user);

    
    if (user.subscription) {
      const subscription = await Subscription.findById(user.subscription);
      subscription.name = name;
      subscription.total = total;
      subscription.plan = plan;
      subscription.remain = total;

      await subscription.save();
      // console.log(await user.populate("subscription", "email subscription"));
      return res
        .status(200)
        .json(await user.populate("subscription", "email subscription"));
    }

    const newSubscriptioin = new Subscription({
      name: name,
      total: total,
      plan: plan,
    });

    const savedSubscription = await newSubscriptioin.save();
    user.subscription = savedSubscription._id;

    await user.save();
    // console.log("user", user);
    // console.log("user.subscription", await user.populate("subscription"));
    return res
      .status(200)
      .json(await user.populate("subscription", "email subscription"));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.addPlan = addPlan;
