const { mongoose } = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleError } = require('../utils/handleError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => handleError(error, res));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new mongoose.Error.DocumentNotFoundError();
        throw error;
      }
      res.send({ data: user });
    })
    .catch((error) => handleError(error, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch((error) => handleError(error, res)));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-super-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, { httpOnly: true })
        .end();
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

module.exports.updateUserData = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then(() => {
      res.send({ name, about });
    })
    .catch((error) => handleError(error, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      console.log('Прошел!');
      res.send({ data: user });
    })
    .catch((error) => handleError(error, res));
};
