const express = require('express');
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategory,
  updateSubCategory
} = require('../controllers/subCategoryController');

const router = express.Router();

// CREATE SUBCATEGORY under a Category
// e.g. POST /subcategory/:categoryId
router.post('/:categoryId', createSubCategory);

// GET ALL SUBCATEGORIES
router.get('/', getAllSubCategories);

// GET ALL SUBCATEGORIES UNDER A SPECIFIC CATEGORY
router.get('/bycategory/:categoryId', getSubCategoriesByCategory);

// GET SUBCATEGORY BY NAME OR ID
router.get('/:identifier', getSubCategory);

// EDIT SUBCATEGORY
router.put('/:id', updateSubCategory);

module.exports = router;
