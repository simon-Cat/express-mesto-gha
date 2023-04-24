const { mongoose } = require('mongoose');

const errorCodes = {
  ERROR_INCORECT_DATA_CODE: 400,
  ERROR_NOT_FOUND_CODE: 404,
  ERROR_DEFAULT_CODE: 500,
};

module.exports.handleError = (error, res) => {
  if (error instanceof mongoose.Error.ValidationError
    || error instanceof mongoose.Error.CastError) {
    res.status(errorCodes.ERROR_INCORECT_DATA_CODE).send({ message: 'Переданы некорректные данные!' });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(errorCodes.ERROR_NOT_FOUND_CODE).send({ message: 'Данные не найдены!' });
  } else {
    res.status(errorCodes.ERROR_DEFAULT_CODE).send({ message: 'Неопознанная ошибка!' });
  }
};
