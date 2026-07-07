const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsd_store';

app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: String,
});

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  total: Number,
  status: String,
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json({ message: 'Users fetched successfully', data: users });
});

app.post('/api/users', async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = new User({ name, email, role: role || 'Customer' });
  await newUser.save();
  res.status(201).json({ message: 'User created', data: newUser });
});

app.delete('/api/users/:id', async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User deleted' });
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json({ message: 'Products fetched successfully', data: products });
});

app.post('/api/products', async (req, res) => {
  const { name, price, stock, category } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Name, price and stock are required' });
  }

  const newProduct = new Product({
    name,
    price: Number(price),
    stock: Number(stock),
    category: category || 'General',
  });

  await newProduct.save();
  res.status(201).json({ message: 'Product created', data: newProduct });
});

app.delete('/api/products/:id', async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ message: 'Product deleted' });
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.json({ message: 'Orders fetched successfully', data: orders });
});

app.post('/api/orders', async (req, res) => {
  const { userId, productId, quantity, status } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'User ID and product ID are required' });
  }

  let parsedUserId = userId;
  let parsedProductId = productId;

  try {
    parsedUserId = new mongoose.Types.ObjectId(userId);
    parsedProductId = new mongoose.Types.ObjectId(productId);
  } catch (error) {
    return res.status(400).json({ error: 'Please use valid MongoDB ObjectIds for userId and productId' });
  }

  const user = await User.findById(parsedUserId);
  const product = await Product.findById(parsedProductId);

  if (!user || !product) {
    return res.status(404).json({ error: 'User or product not found' });
  }

  if (!quantity || Number(quantity) < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  const newOrder = new Order({
    userId: parsedUserId,
    productId: parsedProductId,
    quantity: Number(quantity),
    total: Number(product.price) * Number(quantity),
    status: status || 'Pending',
  });

  await newOrder.save();
  res.status(201).json({ message: 'Order created', data: newOrder });
});

app.delete('/api/orders/:id', async (req, res) => {
  const deleted = await Order.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json({ message: 'Order deleted' });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
