const express = require('express');
const mongo = require('./database');

const { createUser } = require('./functions/createUser.js');
const { getAllUser } = require('./functions/getAllUser.js');
const { getUserByID } = require('./functions/getUserByID.js');
const { deleteUserByID } = require('./functions/deleteUserByID.js');
const { updateUserByID } = require('./functions/updateUserByID.js');

const server = express();
server.use(express.json());

server.post('/createUser', createUser);
server.get('/getAllUser', getAllUser);
//ID send in request body, because ID could sensitive
//and someone could wiretape the line
server.get('/getUserByID', getUserByID);
server.delete('/deleteUserByID', deleteUserByID);
server.put('/updateUserByID', updateUserByID);

server.listen(process.env.EXPRESSPORT, () => {
  console.log('Server is running at:' + process.env.EXPRESSPORT);
});
