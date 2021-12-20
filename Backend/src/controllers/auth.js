const { Op } = require("sequelize");
const { User, Subscription } = require("../sequelize");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");

exports.skyconnect = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  await user.save();

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});

exports.skymine = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "userID",
      "avatar",
      "cover",
      "channelDescription",
    ],
  });

  const subscriptions = await Subscription.findAll({
    where: { subscriber: req.user.id },
  });

  const userIds = subscriptions.map((sub) => sub.subscribeTo);

  const channels = await User.findAll({
    attributes: ["id", "avatar", "username", "userID"],
    where: {
      id: {
        [Op.in]: userIds,
      },
    },
  });

  user.setDataValue("channels", channels);

  res.status(200).json({ success: true, data: user });
};
