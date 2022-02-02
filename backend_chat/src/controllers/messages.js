const Message = require('../modules/message');

const messages = async (req, res) => {
  const from = req.params.id;
  const { uid } = req;

  const last30 = await Message.find({
    from: { $in: [uid, from] },
    to: { $in: [uid, from] },
  })
    .sort({ createdAt: 'asc' })
    .limit(30);

  res.json({
    ok: true,
    from,
    uid,
    messages: last30,
  });
};

const recordMessage = async (payload) => {
  try {
    const msg = await Message.create({ ...payload });
    await msg.save();
    return msg;
  } catch (error) {
    console.log(error);
    return false
  }
};

module.exports = {
  messages,
  recordMessage,
};