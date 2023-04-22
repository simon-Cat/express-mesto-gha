const Card = require('../models/CardSchema');
const { handleError } = require('../utils/handleError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(error => handleError(error, res))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
    const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(error => handleError(error, res))
}

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send(`Карточка с id: ${req.params.cardId} успешно удалена!`))
    .catch(error => handleError(error, res))
}

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.send(`Лайк =))!`))
    .catch(error => handleError(error, res))
}

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(() => res.send(`Дизлайк =((!`))
    .catch(error => handleError(error, res))
}