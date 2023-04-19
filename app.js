const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;


const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true
}).then(() => console.log('BD Access!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
