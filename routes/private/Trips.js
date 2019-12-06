const router = require('express').Router();

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const users = require('../../data');

router.get('/', function(req, res) {
  res.json({ message: 'Success! You can not see this without a token' });
});

router.get('/apple', function(req, res) {
  res.json({ message: 'Success! You can not see this without a token' });
});
router.get('/orange', function(req, res) {
  res.json({ message: 'Success! You can not see this without a token' });
});
module.exports = router;
