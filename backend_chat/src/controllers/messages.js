const Message = require('../modules/message');

const messages = async (req, res) => {
  const from = req.params.id;
  const { uid } = req;

  const last30 = await Message.find({
    $of: [
      { from: uid, to: from },
      { from, to: uid },
    ],
  })
    .sort({ createdAt: 'desc' })
    .limit(30);

  res.json({
    ok: true,
    from,
    uid,
    messages: last30,
  });
};

module.exports = { messages };