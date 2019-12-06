const express = require('express');
require('dotenv/config');

const passport = require('passport');

const strategy = require('./passport');

passport.use(strategy);

const app = express();
app.use(passport.initialize());

app.use(express.json());
// call routes
app.use('/', require('./routes/index.js'));

app.listen(3000, function() {
  console.log('Express running on Port 3000');
});
