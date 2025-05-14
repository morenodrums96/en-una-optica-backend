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
  variants: [{
    color: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    images: [String],
  }]
  ,
  lensColor: {
    type: String,
    trim: true
  },
  customerPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  frameMaterial: {
    type: String,
    trim: true
  },
  frond: {
    type: Boolean,
    default: false,
  },
  iva: {
    type: Boolean,
    default: false,
  }, faceShape: {
    type: String,
    trim: true,
  }, frameShape: {
    type: String,
    trim: true,
  },
  sales: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
