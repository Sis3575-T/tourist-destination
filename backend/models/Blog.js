const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
