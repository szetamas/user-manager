const express = require('express');
const mongo = require('./database');

const { createUser } = require('./functions/createUser.js');

const server = express();
server.use(express.json());

server.post('/createUser', createUser);

server.listen(process.env.EXPRESSPORT, () => {
  console.log('Server is running at:' + process.env.EXPRESSPORT);
});
