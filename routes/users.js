const users = require('express').Router();
const {
  getUsers, getUser, createUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUser);

users.patch('/me', updateUserData);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
