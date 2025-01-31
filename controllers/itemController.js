const Item = require('../models/item');
const Category = require('../models/category');
const SubCategory = require('../models/Subcategory');

// CREATE ITEM under a Category or a SubCategory
exports.createItem = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params; 
    // We decide if item belongs to category or subCategory from the route or query
    let category = null;
    let subCategory = null;

    if (subCategoryId) {
      subCategory = await SubCategory.findById(subCategoryId).populate('category');
      if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }
      category = await Category.findById(subCategory.category._id);
    } else if (categoryId) {
      category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    // Merge tax defaults if user doesn't provide
    let { taxApplicable, tax, baseAmount, discount } = req.body;

    // If not provided, default to subCategory or category
    if (typeof taxApplicable !== 'boolean') {
      taxApplicable = subCategory ? subCategory.taxApplicable : category.taxApplicable;
    }
    if (typeof tax !== 'number') {
      tax = subCategory ? subCategory.tax : category.tax;
    }

    discount = discount || 0;
    baseAmount = baseAmount || 0;
    const totalAmount = baseAmount - discount;

    const item = new Item({
      ...req.body,
      taxApplicable,
      tax,
      baseAmount,
      discount,
      totalAmount,
      category: category ? category._id : null,
      subCategory: subCategory ? subCategory._id : null
    });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// GET ALL ITEMS
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category subCategory');
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL ITEMS UNDER A CATEGORY
exports.getItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const items = await Item.find({ category: categoryId }).populate('category subCategory');
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL ITEMS UNDER A SUBCATEGORY
exports.getItemsBySubCategory = async (req, res) => {
  const { subCategoryId } = req.params;
  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    const items = await Item.find({ subCategory: subCategoryId }).populate('category subCategory');
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ITEM BY NAME OR ID
exports.getItem = async (req, res) => {
  const { identifier } = req.params;
  try {
    let item;
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    if (isObjectId) {
      item = await Item.findById(identifier).populate('category subCategory');
    }
    if (!item) {
      item = await Item.findOne({ name: identifier }).populate('category subCategory');
    }
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// EDIT ITEM
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Recalculate totalAmount if baseAmount/discount changed
    if (req.body.baseAmount || req.body.discount) {
      const base = req.body.baseAmount || 0;
      const discount = req.body.discount || 0;
      req.body.totalAmount = base - discount;
    }
    const item = await Item.findByIdAndUpdate(id, req.body, { new: true }).populate('category subCategory');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// SEARCH ITEMS BY NAME (case-insensitive)
exports.searchItems = async (req, res) => {
  const { name } = req.query; // or you can do req.params
  if (!name) {
    return res.status(400).json({ message: 'Please provide a name to search' });
  }
  try {
    const items = await Item.find({
      name: { $regex: name, $options: 'i' }
    }).populate('category subCategory');
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
