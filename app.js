const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes');

const PORT = 3000;
const app = express();

app.use('/', router);

mongoose.connect("mongodb://localhost:27017/mestodb").then(() => {
  console.log("Connected!");
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
