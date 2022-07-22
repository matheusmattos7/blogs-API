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

module.exports = {
  createCategories,
};