const Category = require('../models/category');
const SubCategory = require('../models/Subcategory');

// CREATE SUBCATEGORY under a specific Category
exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Inherit tax from Category if none is explicitly given
    let { taxApplicable, tax, ...rest } = req.body;
    if (typeof taxApplicable !== 'boolean') {
      taxApplicable = category.taxApplicable;
    }
    if (typeof tax !== 'number') {
      tax = category.tax;
    }

    const subCategory = new SubCategory({
      ...rest,
      taxApplicable,
      tax,
      category: categoryId
    });
    await subCategory.save();
    return res.status(201).json(subCategory);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key for (name, category)
      return res.status(400).json({
        error: `SubCategory "${req.body.name}" already exists under this Category.`
      });
    }
    return res.status(400).json({ error: error.message });
  }
};

// GET ALL SUBCATEGORIES
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    return res.json(subCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL SUBCATEGORIES UNDER A SPECIFIC CATEGORY
exports.getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const subCategories = await SubCategory.find({ category: categoryId });
    return res.json(subCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET SUBCATEGORY BY NAME OR ID
exports.getSubCategory = async (req, res) => {
  const { identifier } = req.params;
  try {
    let subCategory;
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    if (isObjectId) {
      subCategory = await SubCategory.findById(identifier).populate('category');
    }
    if (!subCategory) {
      subCategory = await SubCategory.findOne({ name: identifier }).populate('category');
    }
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    return res.json(subCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// EDIT SUBCATEGORY
exports.updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    return res.json(subCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Another subcategory with that name already exists in this category.`
      });
    }
    return res.status(400).json({ error: error.message });
  }
};


