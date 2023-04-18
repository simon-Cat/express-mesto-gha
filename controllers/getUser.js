const User = require('../models/userSchema');

module.exports.getUser = (req, res) => {
  if(!req.params.id) {
    console.log('Отсуствуют параметры запроса!');

    return;
  }

  User.findById(req.params.id)
    .then(user => res.send({data: user}))
    .catch(error => console.log(`Ошибка - ${error.name} - ${error.message}`))
}