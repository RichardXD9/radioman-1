// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    enum: ['Disponível', 'Esgotado'],
    default: 'Disponível'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Vinil', 'CD', 'Merch'],
    required: true
  },
  stock: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

// models/Cart.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [CartItemSchema],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);

// models/Order.js
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  title: String,
  price: String,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);