const User = require('../models/userModel');

async function deleteUserByID(req, res) {
  try {
    const id = req.body.id;
    if (id === undefined || isNaN(id)) {
      res.status(400).send('ID is missing or wrong');
      return -1;
    }

    let result = await User.deleteOne({ id: id });
    if (result.deletedCount === 0) {
      res.status(400).send('This user doesnt exist');
      return -1;
    }

    res.status(200).send(id + ' user removed');
    return 1;
  } catch (error) {
    //DONT send the error message, it could contain sensitive data
    console.log('Error:' + error);
    res.status(500).send({ Error: 'Something went wrong' });
    return -1;
  }
}

module.exports = { deleteUserByID };
