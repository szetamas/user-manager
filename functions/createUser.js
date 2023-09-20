const mongoose = require('mongoose');
const User = require('../models/userModel');

async function createUser(req, res) {
  try {
    const { username, email } = req.body;
    if (username === undefined || email === undefined) {
      res.status(400).send({ Error: 'Username and/or Email is missing' });
      return -1;
    }

    //with a nanoid or something there is a little chance
    //for duplication and for a random error
    let result;
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 1000000000);
      result = await User.find({ id: randomNum });
    } while (result[0] !== undefined);

    const newUser = new User({
      id: randomNum,
      username: username,
      email: email,
    });

    newUser
      .save()
      .then((user) => {
        console.log('User saved into the database: ' + user);
        res.status(201).send(user);
        return 1;
      })
      .catch((error) => {
        console.log('Error:' + error);

        if (error.code === 11000 && error.keyValue.email === email) {
          res.status(400).send({ Error: 'This email is already used' });
          return -1;
        }

        if (error.name === 'ValidationError' && error.errors.email) {
          res.status(400).send({ Error: 'Email is wrong' });
          return -1;
        }

        res.status(500).send({ Error: 'Something went wrong' });
        return -1;
      });
  } catch (error) {
    //DONT send the error message, it could contain sensitive data
    console.log('Error:' + error);
    res.status(500).send({ Error: 'Something went wrong' });
    return -1;
  }
}

module.exports = { createUser };
