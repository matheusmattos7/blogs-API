const status = require('../util/statusHttpCode');
const categoriesService = require('../services/categoriesService');

const createCategories = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await categoriesService.createCategories({ name });

    return res.status(status.CREATED).json(category);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const { body } = req;

    const categories = await categoriesService.getCategories(body);

    return res.status(status.OK).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategories,
  getCategories,
};