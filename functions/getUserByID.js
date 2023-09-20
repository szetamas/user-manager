const User = require('../models/userModel');

async function getUserByID(req, res) {
  try {
    const id = req.body.id;
    if (id === undefined || isNaN(id)) {
      res.status(400).send({ Error: 'ID is missing or wrong' });
      return -1;
    }

    const result = await User.find({ id: id });
    if (result[0] === undefined) {
      res.status(400).send({ Error: 'This user doesnt exist' });
      return -1;
    }

    res.status(200).send(result[0]);
    return 1;
  } catch (error) {
    //DONT send the error message, it could contain sensitive data
    console.log('Error:' + error);
    res.status(500).send({ Error: 'Something went wrong' });
    return -1;
  }
}

module.exports = { getUserByID };
