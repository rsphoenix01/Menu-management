const express = require('express');
const {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItem,
  updateItem,
  searchItems
} = require('../controllers/itemController');

const router = express.Router();

// CREATE ITEM: either under Category or SubCategory
// Examples:
// POST /item/category/63fabc123/category => belongs to Category
// POST /item/subcategory/63fxyz456 => belongs to SubCategory
router.post('/category/:categoryId', createItem);
router.post('/subcategory/:subCategoryId', createItem);

// GET ALL ITEMS
router.get('/', getAllItems);

// GET ALL ITEMS UNDER A CATEGORY
router.get('/bycategory/:categoryId', getItemsByCategory);

// GET ALL ITEMS UNDER A SUBCATEGORY
router.get('/bysubcategory/:subCategoryId', getItemsBySubCategory);

// SEARCH ITEMS by name (case-insensitive) => /item/search?name=coffee
router.get('/search', searchItems);

// GET ITEM BY NAME OR ID
router.get('/:identifier', getItem);

// EDIT ITEM
router.put('/:id', updateItem);

module.exports = router;

