const Card = require('../models/card');
const { handleError } = require('../utils/handleError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((error) => handleError(error, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;
  console.log(ownerID);

  Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => handleError(error, res));
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send(`Карточка с id: ${req.params.cardId} успешно удалена!`))
    .catch((error) => handleError(error, res));
};

module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.send('Лайк =))!'))
    .catch((error) => handleError(error, res));
};

module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(() => res.send('Дизлайк =((!'))
    .catch((error) => handleError(error, res));
};
