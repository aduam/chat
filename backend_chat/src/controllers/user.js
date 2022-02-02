const User = require('../modules/user');

const userOnline = async (uid, online) => {
  const user = await User.findById(uid);
  if (!user) {
    return null;
  }
  user.online = online;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User
    .find()
    .sort('-online');
  return users;
};

module.exports = {
  userOnline,
  getUsers,
};
