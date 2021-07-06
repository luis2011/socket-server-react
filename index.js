const Server  = require('./models/server');

// esto va a leer mi archivo env : npm i dotenv
require('dotenv').config();

const server = new Server();

server.execute();









