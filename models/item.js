const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicable: { type: Boolean, default: null },
  tax: { type: Number, default: 0 },
  baseAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  // Either belongs to a SubCategory or a Category
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', default: null },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
});

module.exports = mongoose.model('Item', ItemSchema);

