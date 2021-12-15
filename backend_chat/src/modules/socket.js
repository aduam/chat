class Socket {
  constructor(io) {
    this.io = io;
  }

  eventSockets() {
    this.io.on('connection', (socket) => {
      console.log('socket connected: ', socket.id);

      // validate jwt

      // know which user is active although the UID

      // Emit all active users

      // socket join

      // Hear when the client send a message

      // disconnect
    });
  }
}

module.exports = Socket;
