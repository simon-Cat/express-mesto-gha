const users = require('express').Router();
const { getUsers, getUser, createUser, updateUserData, updateUserAvatar } = require('../controllers/users');

users.get('/users', getUsers);
users.get('/users/:userId', getUser);

users.post('/users', createUser);

users.patch('/users/me', updateUserData);
users.patch('/users/me/avatar', updateUserAvatar);

module.exports = users;
