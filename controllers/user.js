const User = require('../models/userSchema');
const { handleError } = require('../utils/handleError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(error => handleError(error, res))
}

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  if(!userId) {
    console.log('Отсуствуют параметры запроса!');

    return;
  }

  User.findById(userId)
    .then(user => res.send({ data: user }))
    .catch(error => handleError(error, res))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(error => handleError(error, res))
}

module.exports.updateUserData = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { "name": name, "about": about }, { new: true, runValidators: true })
    .then(() => {
      res.send({ name, about });
    })
    .catch(error => handleError(error, res))
}

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { "avatar": avatar }, { new: true, runValidators: true })
    .then((user) => {
      console.log('Прошел!');
      res.send({ data: user });
    })
    .catch(error => handleError(error, res))
}