// src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this product.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this product.'],
  },
  price: {
    type: Number, // Stored in cents
    required: [true, 'Please provide a price for this product.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL for this product.'],
  },
  type: {
    type: String,
    required: [true, 'Please specify the product type.'],
  },
  genre: {
    type: [String], // Array of strings for genres
    required: true,
  },
  color: {
    type: [String], // Array of strings for colors
    required: true,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide the stock quantity.'],
    default: 0,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
