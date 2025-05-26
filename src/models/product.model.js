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
  size: {
    type: String,
    enum: ['Angosto', 'Promedio', 'Ancho', 'Extra ancho'],
    default: 'Promedio',
  },
  customerPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  frameMaterial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  frond: {
    type: Boolean,
    default: false,
  },
  canModifyQuantity: {
    type: Boolean,
    default: false,
  },
  iva: {
    type: Boolean,
    default: false,
  }, faceShape: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  }, frameShape: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  configurableOptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConfigurableOption'
  }],
  sales: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
