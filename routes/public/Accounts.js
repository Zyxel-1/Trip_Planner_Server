const router = require('express').Router();

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const users = require('../../data');

router.post('/', function(req, res) {
  res.json({ message: 'Registering....' });
});
router.put('/login', function(req, res) {
  const { body } = req;
  console.log(body);
  if (body.email && body.password) {
    var { email } = body;
    const { password } = body;
  }
  // usually this would be a database call:

  const user = users[_.findIndex(users, { email })];
  if (!user) {
    res.status(401).json({ message: 'no such user found' });
  }

  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.PRIVATE_KEY);
    res.json({ message: 'ok', token });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});
module.exports = router;
