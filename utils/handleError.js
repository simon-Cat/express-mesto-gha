const errorCodes = {
  ERROR_INCORECT_DATA_CODE: 400,
  ERROR_NOT_FOUND_CODE: 404,
  ERROR_DEFAULT_CODE: 500
}

module.exports.handleError = (error, res) => {
  if(error.name === 'ValidationError') {
    res.status(errorCodes.ERROR_INCORECT_DATA_CODE).send({ "message": "Переданы некорректные данные!" });

    return;
  }
  if(error.name === 'CastError') {
    res.status(errorCodes.ERROR_NOT_FOUND_CODE).send({ "message": "Данные не найдены!" });

    return;
  }

  res.status(errorCodes.ERROR_DEFAULT_CODE).send({ "message": "Неопознанная ошибка!" });
}