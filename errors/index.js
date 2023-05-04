const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const ConflictError = require('./conflict-error');
const AuthorizationError = require('./authorization-error');

module.exports.AuthorizationError = AuthorizationError;
module.exports.BadRequestError = BadRequestError;
module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;

