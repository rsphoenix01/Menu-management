const Category = require('../models/category');
const SubCategory = require('../models/Subcategory');
const Item = require('../models/item');

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET CATEGORY BY NAME OR ID
exports.getCategory = async (req, res) => {
  const { identifier } = req.params; // could be name or ID
  try {
    let category;
    // Check if 'identifier' is a valid ObjectId
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    if (isObjectId) {
      // Attempt find by ID
      category = await Category.findById(identifier);
    }
    if (!category) {
      // If not found by ID or not a valid ID, try find by name
      category = await Category.findOne({ name: identifier });
    }

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// EDIT CATEGORY
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

