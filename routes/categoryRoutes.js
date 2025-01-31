const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory
} = require('../controllers/categoryController');

const router = express.Router();

// CREATE CATEGORY
router.post('/', createCategory);

// GET ALL CATEGORIES
router.get('/', getAllCategories);

// GET CATEGORY BY NAME OR ID
router.get('/:identifier', getCategory);

// EDIT CATEGORY
router.put('/:id', updateCategory);

module.exports = router;

