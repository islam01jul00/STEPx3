const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ConflictError } = require('../errors');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

const signUp = async (firstName, lastName, email, password) => {
  const currentUser = await User.findOne({ email });

  if (currentUser) {
    throw new ConflictError('The email address is already in use.');
  }

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const user = await User.create({
    firstName,
    lastName,
    email,
    hash,
  });

  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

module.exports = { signUp };
