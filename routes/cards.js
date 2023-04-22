const cards = require('express').Router();
const { getCards, createCard, removeCard, likeCard, dislikeCard } = require('../controllers/cards');


cards.get('/cards', getCards);

cards.post('/cards', createCard);

cards.put('/cards/:cardId/likes', likeCard);

cards.delete('/cards/:cardId', removeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);




module.exports = cards;