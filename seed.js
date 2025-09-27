const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const items = [
  { name: 'Margherita Pizza', description: 'Classic cheese pizza', price: 199, category: 'Pizza' },
  { name: 'Veg Burger', description: 'Juicy veg patty', price: 129, category: 'Burger' },
  { name: 'French Fries', description: 'Crispy fries', price: 79, category: 'Sides' }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myfirstreactdb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(items);
  console.log('Seed data inserted');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
