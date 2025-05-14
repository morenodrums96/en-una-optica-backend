import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    trim: true
  },
  productId: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  customerId: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);
