const User = require('../models/userSchema');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(error => console.log(`Ошибка - ${error.name} - ${error.message}`))
}