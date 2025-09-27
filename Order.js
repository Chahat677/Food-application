const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    qty: Number,
    price: Number
  }],
  total: Number,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  status: { type: String, enum: ['pending','accepted','preparing','out-for-delivery','delivered','cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
