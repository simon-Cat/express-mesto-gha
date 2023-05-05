// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new NotFoundError('Данные о пользователях не найдены')));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => next(new NotFoundError('Пользователь не найден')));
};

module.exports.getMeInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => next(new NotFoundError('Данные о пользователе не найдены')));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({ data: user });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с такими данными уже существует'));
          return;
        }
        next(new BadRequestError('Указаны некорректные данные'));
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-super-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, { httpOnly: true })
        .end();
    })
    .catch((err) => next(err));
};

module.exports.updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then(() => {
      res.send({ name, about });
    })
    .catch(() => next(new BadRequestError('Указаны некорректные данные')));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => next(new BadRequestError('Указаны некорректные данные')));
};
