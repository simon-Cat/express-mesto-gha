const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb").then(() => {
  console.log("Connected!");
});

app.listen(PORT, () => {
  console.log(`Слушаю порт - ${PORT}`);
});
