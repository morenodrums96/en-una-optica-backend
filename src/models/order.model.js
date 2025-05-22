import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // asegúrate que coincida con .model('Customers')
    required: true
  },
  guide: {
    type: String,
    required: true,
    trim: true,
  },
  cellphone: {
    type: String,
    required: true,
    trim: true,
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
        required: true,
        min: 0
      },
      total: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true,
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

  paymentMethod: {
    type: String,
    enum: ['card', 'oxxo', 'paypal', 'bank_transfer'],
    default: 'card'
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
