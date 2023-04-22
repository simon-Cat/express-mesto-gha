const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');


const { PORT = 3000 } = process.env;


const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true
}).then(() => console.log('BD Access!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // id пользователя
  req.user = {
    _id: '6444084ce521a9ef30be3e88'
  };

  next();
});

app.use('/', cards);
app.use('/', users);


app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
