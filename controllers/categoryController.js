const Category = require('../models/category');

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error for unique name
      return res.status(400).json({
        error: `Category with name "${req.body.name}" already exists.`
      });
    }
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
  const { identifier } = req.params;
  try {
    let category;
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    if (isObjectId) {
      category = await Category.findById(identifier);
    }
    if (!category) {
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
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Category with this name already exists.`
      });
    }
    return res.status(400).json({ error: error.message });
  }
};


