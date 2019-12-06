const passportJWT = require('passport-jwt');
const _ = require('lodash');
const users = require('./data');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.PRIVATE_KEY;

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
module.exports = strategy;
