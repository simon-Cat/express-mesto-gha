const { Error } = require('mongoose');
const Card = require('../models/card');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;

  Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => next(err));
};

module.exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с id: ${cardId} не найдена`));
      }

      const ownerId = card.owner._id;

      if (!(ownerId.toString() === userId)) {
        return next(new ForbiddenError('У вас нет прав для удаления карточек других пользователей'));
      }

      return card.deleteOne()
        .then(() => res.send({ message: `Карточка с id: ${cardId} успешно удалена!` }));
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError('Неверно указан id карточки'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с id: ${cardId} не найдена`));
      }
      return card.updateOne({ $addToSet: { likes: userId } }, { new: true })
        .then(() => res.send({ message: 'Лайк' }));
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError('Неверно указан id карточки'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с id: ${cardId} не найдена`));
      }
      return card.updateOne({ $pull: { likes: userId } }, { new: true })
        .then(() => res.send({ message: 'Дизлайк' }));
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return next(new BadRequestError('Неверно указан id карточки'));
      }
      next(err);
    });
};
