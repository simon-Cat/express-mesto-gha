const users = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Segments, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUserData, updateUserAvatar, getMeInfo,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getMeInfo);
users.get('/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string(),
  }),
}), getUser);

users.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserData);

users.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/),
  }),
}), updateUserAvatar);

module.exports = users;
