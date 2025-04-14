// scripts/seed-db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-store');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Product model schema
const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  availability: String,
  description: String,
  price: String,
  genre: String,
  color: String,
  type: String,
  stock: Number
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Sample product data
const vinylProducts = [
  {
    image: '/images/adrenaline.jpg',
    title: 'Deftones - Adrenaline',
    availability: 'Disponível',
    description: 'Adrenaline Vinil',
    price: '45.00 €',
    genre: 'Hardcore',
    color: 'Preto',
    type: 'Vinil',
    stock: 10
  },
  {
    image: '/images/Kornstl.jpg',
    title: 'Korn - Self Titled',
    availability: 'Disponível',
    description: 'Korn Vinil',
    price: '45.00 €',
    genre: 'Numetal',
    color: 'Branco',
    type: 'Vinil',
    stock: 8
  },
  {
    image: '/images/LPhybrid.jpg',
    title: 'Linkin Park - Hybrid Theory',
    availability: 'Disponível',
    description: 'Hybrid Theory Vinil',
    price: '45.00 €',
    genre: 'Alternative',
    color: 'Vermelho',
    type: 'Vinil',
    stock: 15
  }
];

const cdProducts = [
  {
    image: '/images/adrenaline.jpg',
    title: 'Deftones - Adrenaline',
    availability: 'Disponível',
    description: 'Adrenaline CD',
    price: '25.00 €',
    genre: 'Hardcore',
    color: 'Preto',
    type: 'CD',
    stock: 20
  },
  {
    image: '/images/Kornstl.jpg',
    title: 'Korn - Self Titled',
    availability: 'Disponível',
    description: 'Korn CD',
    price: '25.00 €',
    genre: 'Numetal',
    color: 'Branco',
    type: 'CD',
    stock: 12
  },
  {
    image: '/images/LPhybrid.jpg',
    title: 'Linkin Park - Hybrid Theory',
    availability: 'Disponível',
    description: 'Hybrid Theory CD',
    price: '25.00 €',
    genre: 'Alternative',
    color: 'Vermelho',
    type: 'CD',
    stock: 18
  }
];

// Merchandise products
const merchProducts = [
  {
    image: '/images/shirt.jpg',
    title: 'Deftones - T-Shirt',
    availability: 'Disponível',
    description: 'Black T-Shirt with Deftones logo',
    price: '30.00 €',
    genre: 'Hardcore',
    color: 'Preto',
    type: 'Merch',
    stock: 25
  },
  {
    image: '/images/hoodie.jpg',
    title: 'Linkin Park - Hoodie',
    availability: 'Disponível',
    description: 'Gray Hoodie with Linkin Park logo',
    price: '50.00 €',
    genre: 'Alternative',
    color: 'Cinza',
    type: 'Merch',
    stock: 15
  }
];

// Combine all products
const allProducts = [...vinylProducts, ...cdProducts, ...merchProducts];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');
    
    // Insert new products
    await Product.insertMany(allProducts);
    console.log(`Added ${allProducts.length} products to the database`);
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Database disconnected');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding process
dbConnect().then(() => {
  seedDatabase();
});