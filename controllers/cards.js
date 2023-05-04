const Card = require('../models/card');
const { AuthorizationError, BadRequestError, NotFoundError, ConflictError } = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new NotFoundError('Данные о карточках не найдены')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;

  Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => next(new BadRequestError('Указаны некорректные данные')));
};

module.exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      const ownerId = card.owner._id;

      if (!(ownerId.toString() === userId)) {
        throw new AuthorizationError('У вас нет прав для удаления карточек других пользователей');
      }

      Card.findByIdAndRemove(cardId)
        .then(() => res.send({ message: `Карточка с id: ${cardId} успешно удалена!` }));
    })
    .catch((error) => {
      if (error.name === 'TypeError') {
        next(new ConflictError(`Карточка с id - ${cardId} была удалена ранее`));
        return;
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.send('Лайк =))!'))
    .catch((error) => next(error));
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(() => res.send('Дизлайк =((!'))
    .catch((error) => next(error));
};
