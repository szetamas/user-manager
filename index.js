const express = require('express');
const mongo = require('./database');

const server = express();
server.use(express.json());

server.listen(process.env.EXPRESSPORT, () => {
  console.log('Server is running at:' + process.env.EXPRESSPORT);
});
