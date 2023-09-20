const User = require('../models/userModel');

async function getAllUser(req, res) {
  try {
    const result = await User.find({});
    res.status(200).send(result);
    return 1;
  } catch (error) {
    //DONT send the error message, it could contain sensitive data
    console.log('Error:' + error);
    res.status(500).send({ Error: 'Something went wrong' });
    return -1;
  }
}

module.exports = { getAllUser };
