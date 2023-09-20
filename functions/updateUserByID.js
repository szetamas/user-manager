const User = require('../models/userModel');

async function updateUserByID(req, res) {
  try {
    const { id, username, email } = req.body;
    if (id === undefined || isNaN(id)) {
      res.status(400).send({ Error: 'ID is missing or wrong' });
      return -1;
    }

    if (username === undefined || email === undefined) {
      res.status(400).send({ Error: 'Username and/or Email is missing' });
      return -1;
    }

    let result = await User.updateOne(
      { id: id },
      { username: username, email: email }
    );

    if (result.modifiedCount === 0) {
      if (result.matchedCount === 0) {
        res.status(404).send({ Error: 'This user doesnt exist' });
        return -1;
      } else {
        res.status(304).send({ Status: 'Not modified' });
        return 1;
      }
    }

    if (result.modifiedCount === 1) {
      res.status(200).send({ Succes: id + ' user modified' });
      return 1;
    }
  } catch (error) {
    //DONT send the error message, it could contain sensitive data
    console.log('Error:' + error);
    res.status(500).send({ Error: 'Something went wrong' });
    return -1;
  }
}

module.exports = { updateUserByID };
