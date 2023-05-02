const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { cards, users } = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('BD Access!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6446dd2642a4c0cc750f8cf0',
//   };

//   next();
// });
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res, next) => {
  res.status(404).send('Страница не найдена!');

  next();
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
