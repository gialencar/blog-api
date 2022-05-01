const categoriesRouter = require('express').Router();
const validateAuthorization = require('../middlewares/validateAuthorization');
const categoriesController = require('../controllers/categories.controller');
const validateCategory = require('../middlewares/validateCategory');

categoriesRouter.post('/', [
  validateAuthorization,
  validateCategory,
  categoriesController.registerCategory,
]);

module.exports = categoriesRouter;
