const express = require('express');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');

const Socket = require('./socket');
const { dbConnection } = require('../database/config');
const auth = require('../router/auth');
const message = require('../router/message');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 2001;
    dbConnection();
    this.server = http.createServer(this.app);
    this.io = socket(this.server);
  }

  middlewares() {
    this.app.use(express.json())
;    this.app.use(cors());
  }

  sockets() {
    const socket = new Socket(this.io);
    socket.eventSockets();
  }

  rest() {
    this.app.use('/api/login', auth);
    this.app.use('/api', message);
  }

  execute() {
    this.middlewares();
    this.sockets();
    this.rest();
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
