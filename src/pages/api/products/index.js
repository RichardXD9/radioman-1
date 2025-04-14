// pages/api/products/index.js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Get query parameters for filtering
        const { type, genre, color, availability } = req.query;
        
        // Build filter object
        const filter = {};
        if (type) filter.type = type;
        if (genre) filter.genre = genre;
        if (color) filter.color = color;
        if (availability) filter.availability = availability;
        
        const products = await Product.find(filter);
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        // Check if user is admin (you'll need to implement this)
        const auth = getAuth(req);
        if (!auth || !auth.userId) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        // Create new product
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}

// pages/api/products/[id].js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        // Update product - add auth check in production
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        // Delete product - add auth check in production
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (deletedProduct.deletedCount === 0) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}

// pages/api/cart/index.js
import dbConnect from '../../../lib/mongodb';
import Cart from '../../../models/Cart';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  // Get user ID from Clerk
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const userId = auth.userId;

  switch (method) {
    case 'GET':
      try {
        // Find user's active cart or create if it doesn't exist
        let cart = await Cart.findOne({ userId, active: true }).populate('items.productId');
        
        if (!cart) {
          cart = await Cart.create({ userId, items: [] });
        }
        
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const { productId, quantity = 1 } = req.body;
        
        // Find user's cart or create new one
        let cart = await Cart.findOne({ userId, active: true });
        
        if (!cart) {
          cart = await Cart.create({
            userId,
            items: [{ productId, quantity }]
          });
        } else {
          // Check if product exists in cart
          const itemIndex = cart.items.findIndex(item => 
            item.productId.toString() === productId
          );
          
          if (itemIndex > -1) {
            // Product exists, update quantity
            cart.items[itemIndex].quantity += quantity;
          } else {
            // Product doesn't exist, add new item
            cart.items.push({ productId, quantity });
          }
          
          await cart.save();
        }
        
        // Return updated cart with populated product details
        cart = await Cart.findById(cart._id).populate('items.productId');
        
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        // Clear cart
        await Cart.findOneAndUpdate(
          { userId, active: true },
          { items: [] }
        );
        
        res.status(200).json({ success: true, message: 'Cart cleared' });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}

// pages/api/cart/item.js
import dbConnect from '../../../lib/mongodb';
import Cart from '../../../models/Cart';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  // Get user ID from Clerk
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const userId = auth.userId;

  switch (method) {
    case 'PUT':
      try {
        const { productId, quantity } = req.body;
        
        // Update item quantity
        const cart = await Cart.findOneAndUpdate(
          { userId, active: true, 'items.productId': productId },
          { $set: { 'items.$.quantity': quantity } },
          { new: true }
        ).populate('items.productId');
        
        if (!cart) {
          return res.status(404).json({ success: false, message: 'Cart or item not found' });
        }
        
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'DELETE':
      try {
        const { productId } = req.body;
        
        // Remove item from cart
        const cart = await Cart.findOneAndUpdate(
          { userId, active: true },
          { $pull: { items: { productId } } },
          { new: true }
        ).populate('items.productId');
        
        if (!cart) {
          return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}

// pages/api/orders/index.js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  // Get user ID from Clerk
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const userId = auth.userId;

  switch (method) {
    case 'GET':
      try {
        // Get all orders for user
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'POST':
      try {
        const { shippingAddress } = req.body;
        
        // Find user's active cart
        const cart = await Cart.findOne({ userId, active: true }).populate('items.productId');
        
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        
        // Calculate total amount
        let totalAmount = 0;
        const orderItems = [];
        
        for (const item of cart.items) {
          const product = item.productId;
          const priceValue = parseFloat(product.price.replace(' €', ''));
          totalAmount += priceValue * item.quantity;
          
          // Check if product is in stock
          if (product.stock < item.quantity) {
            return res.status(400).json({ 
              success: false, 
              message: `Not enough stock for ${product.title}` 
            });
          }
          
          // Reduce product stock
          await Product.findByIdAndUpdate(product._id, {
            $inc: { stock: -item.quantity }
          });
          
          // Add to order items
          orderItems.push({
            productId: product._id,
            title: product.title,
            price: product.price,
            quantity: item.quantity
          });
        }
        
        // Create new order
        const order = await Order.create({
          userId,
          items: orderItems,
          totalAmount,
          shippingAddress
        });
        
        // Mark cart as inactive after order
        cart.active = false;
        await cart.save();
        
        res.status(201).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}

// pages/api/orders/[id].js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();
  
  // Get user ID from Clerk
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const userId = auth.userId;

  switch (method) {
    case 'GET':
      try {
        // Get specific order
        const order = await Order.findOne({ _id: id, userId });
        
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    case 'PUT':
      try {
        // Only allow updating shipping address for now
        const { shippingAddress } = req.body;
        
        const order = await Order.findOne({ _id: id, userId });
        
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        // Only allow updating if order is still pending
        if (order.status !== 'Pending') {
          return res.status(400).json({ 
            success: false, 
            message: 'Can only update pending orders' 
          });
        }
        
        order.shippingAddress = shippingAddress;
        await order.save();
        
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}