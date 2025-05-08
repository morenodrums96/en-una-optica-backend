import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  unitCost: {
    type: Number,
    required: true,
    min: 0,
  },
  supplier: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  customerPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: String,
    trim: true,
  },
  frond: {
    type: Boolean,
    default: false,
  },
  iva: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
