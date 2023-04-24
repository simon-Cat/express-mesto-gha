const cards = require('express').Router();
const {
  getCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);

cards.post('/', createCard);

cards.put('/:cardId/likes', likeCard);

cards.delete('/:cardId', removeCard);
cards.delete('/:cardId/likes', dislikeCard);

module.exports = cards;
