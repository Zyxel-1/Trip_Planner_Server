const router = require('express').Router();

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User } = require('../../models/user');

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const user = new User(body);
    await user.save();
    res.status(201).json({ message: 'Registration Complete' });
  } catch (e) {
    res.status(400).send(`An error has occured: ${e}`);
  }
});

router.put('/login', function(req, res) {
  const { body } = req;

  User.findOne({ email: body.email }, (err, user) => {
    if (!user) {
      res.status(400).send('Could not find user');
    }
    if (user.verifyPassword(body.password)) {
      const token = user.generateJWT();
      res.status(200).send({ 'app-token': token });
    } else {
      res.status(400).send('Wrong creds');
    }
  });
});
module.exports = router;
