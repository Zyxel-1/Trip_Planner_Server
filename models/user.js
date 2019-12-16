const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
// JWT expiration is in minutes
const JWT_EXPIRATION_TIME = '12hr';

// Define schema
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  salt: {
    type: String,
    required: false
  }
});
UserSchema.pre('validate', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        user.password = hash;
        user.salt = salt;
        next();
      });
    });
  } else {
    next();
  }
});
// Validate incoming password
UserSchema.methods.verifyPassword = async function(password) {
  const result = await bcrypt.compare(password, this.password);
  console.log(`This is the result ${result}`);
  if (result) {
    return true;
  }
  return false;
};

// Generate user token
UserSchema.methods.generateJWT = function() {
  const user = this;
  // A user can not have more than one JWT token at a time

  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.PRIVATE_KEY, {
      expiresIn: JWT_EXPIRATION_TIME
    })
    .toString();
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
