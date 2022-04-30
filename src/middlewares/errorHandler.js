const { ValidationError } = require('joi');
const logger = require('../logger');
require('express-async-errors');

module.exports = (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  logger.error(err);
  res.status(500).json({ message: 'internal server error :(' });
};
