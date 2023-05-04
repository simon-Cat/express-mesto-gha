const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, errors, Segments, Joi } = require('celebrate');
const { cards, users } = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors');

const { PORT = 3000 } = process.env;

const app = express();

// connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('BD Access!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// using celebrate to validate all incoming requests
// to ensure the authorization header
app.use(celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}));

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

// celebrate error handler
app.use(errors());

// centralized error handler
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// incorrect route error handler
app.use((req, res, next) => {
  const error = new NotFoundError('Страница не найдена');
  res.status(error.statusCode).send({ message: error.message });

  next();
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
