import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false
  },
  sessionId: {
    type: String,
    required: false
  },
  guide: {
    type: String,
    trim: true,
    required: false

  },
  correo: {
    type: String,
    trim: true,
    required: false
  },
  cellphone: {
    type: String,
    trim: true,
    required: false
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      unitPrice: {
        type: Number,
        min: 0
      },
    }
  ],

  totalAmount: {
    type: Number,
    required: false,
    min: 0
  },

  shippingInfo: {
    name: String,
    secondName: String,
    secondLastName: String,
    street: String,
    externalNumber: String,
    internalNumber: String,
    postalCode: String,
    neighborhood: String,
    city: String,
    state: String,
    aditionalReferents: String
  },

  orderStatus: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    required: true
  },
  orderIsSent: {
    type: String,
    enum: ['branch', 'house', 'usa'],
    default: 'house',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'oxxo', 'paypal', 'bank_transfer'],
  },

  shippedDate: Date,
  estimatedDelivery: Date,

  date: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);
