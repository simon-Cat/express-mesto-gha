const router = require('express').Router();
const { getUsers, getUser, createUser, updateUserData, updateUserAvatar } = require('./controllers/user');
const { getCards, createCard, removeCard, likeCard, dislikeCard } = require('./controllers/card');


// user
router.get('/users', getUsers);
router.get('/users/:userId', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUserData);
router.patch('/users/me/avatar', updateUserAvatar);


// card
router.get('/cards', getCards);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId', removeCard);
router.delete('/cards/:cardId/likes', dislikeCard);




module.exports = router;