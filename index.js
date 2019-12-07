require('dotenv/config');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const strategy = require('./passport');

const { mongoose } = require('./database/mongoose');

passport.use(strategy);

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
// call routes
app.use('/', require('./routes/index.js'));

app.listen(process.env.PORT, function() {
  console.log(`Express running on Port ${process.env.PORT}`);
});
