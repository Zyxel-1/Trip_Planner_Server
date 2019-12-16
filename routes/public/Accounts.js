const router = require('express').Router();

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User } = require('../../models/user');

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const user = new User(body);
    await user.save();
    const token = user.generateJWT();
    res
      .set('token', `Bearer ${token}`)
      .send({ message: 'Registration  & Login Successful.', token });
  } catch (e) {
    res.status(400).send(`An error has occured: ${e}`);
  }
});

router.put('/', function(req, res) {
  const { body } = req;

  User.findOne({ email: body.email }, async (err, user) => {
    if (!user || user === null) {
      res.status(400).send('Could not find user');
    } else if (await user.verifyPassword(body.password)) {
      console.log('HELLO');
      const token = user.generateJWT();
      res
        .set('token', `Bearer ${token}`)
        .send({ message: 'Registration  & Login Successful.', token });
    } else {
      res.status(400).send('Wrong creds');
    }
  });
});
module.exports = router;
