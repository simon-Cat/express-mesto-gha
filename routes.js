const router = require('express').Router();
const { getUsers } = require('./controllers/getUsers');
const { getUser } = require('./controllers/getUser');
const { createUser } = require('./controllers/createUser');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);


module.exports = router;