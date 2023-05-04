const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { cards, users } = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('BD Access!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.use((req, res, next) => {
  const error = new NotFoundError('Страница не найдена');
  res.status(error.statusCode).send({ message: error.message });

  next();
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
