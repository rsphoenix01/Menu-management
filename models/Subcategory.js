const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  taxApplicable: { type: Boolean, default: null },
  tax: { type: Number, default: null },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// Create a compound index on (name + category) so that each category can't have duplicate subcategory names
SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);


