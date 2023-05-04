const cards = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Segments, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);

cards.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/),
  }),
}), createCard);

cards.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), likeCard);

cards.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), removeCard);

cards.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string(),
  }),
}), dislikeCard);

module.exports = cards;
