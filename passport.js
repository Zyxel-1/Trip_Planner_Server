const passportJWT = require('passport-jwt');
const _ = require('lodash');
const { User } = require('./models/user');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.PRIVATE_KEY;

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  User.findOne({ id: jwt_payload.id }, (err, user) => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});
module.exports = strategy;
