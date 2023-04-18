const User = require('../models/userSchema');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(error => console.log(`Ошибка - ${error.name} - ${error.message}`))
}