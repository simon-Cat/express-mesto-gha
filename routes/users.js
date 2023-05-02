const users = require('express').Router();
const {
  getUsers, getUser, updateUserData, updateUserAvatar, getMeInfo,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getMeInfo);
users.get('/:userId', getUser);

users.patch('/me', updateUserData);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
