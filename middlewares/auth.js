const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.strartWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходимо авторизоваться.' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload = null;

  try {
    payload = jwt.verify(token, 'some-super-secret-key');
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  req.user = payload;

  next();
};
