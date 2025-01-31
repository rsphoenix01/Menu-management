const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  // Ensures category 'name' is globally unique across the Category collection
  name: { type: String, required: true, unique: true },
  image: String,
  description: String,
  taxApplicable: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  taxType: { type: String, default: '' }
});

module.exports = mongoose.model('Category', CategorySchema);

