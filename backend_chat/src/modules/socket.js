const { verifyToken } = require('../helpers/jwt');
const { userOnline, getUsers } = require('../controllers/user');
const { recordMessage } = require('../controllers/messages');

class Socket {
  constructor(io) {
    this.io = io;
  }

  eventSockets() {
    this.io.on('connection', async (socket) => {
      const token = socket.handshake.query['x-token'];
      const [isValid, uid] = verifyToken(token);

      if (!isValid) {
        console.log('socket was not identified');
        return socket.disconnect();
      }

      await userOnline(uid, true);

      // validate jwt

      // know which user is active although the UID

      // Emit all active users
      this.io.emit('user-list', await getUsers());

      // socket join
      socket.join(uid);

      // Hear when the client send a message
      socket.on('personal-message', async (payload) => {
        const msg = await recordMessage(payload);
        this.io.to(payload.to).emit('personal-message', msg);
        this.io.to(payload.from).emit('personal-message', msg);
      });

      // disconnect
      socket.on('disconnect', async () => {
        await userOnline(uid, false);
        this.io.emit('user-list', await getUsers(uid));
      });
    });
  }
}

module.exports = Socket;
