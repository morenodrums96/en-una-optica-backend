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
      totalByProduct: {
        type: Number,
        min: 0
      },
      customerPriceFrond: {
        type: Number,
        min: 0
      },
      configurableOptions: [
        {
          groupName: String,
          options: [
            {
              name: String,
              price: Number,
              colors: [
                {
                  name: String,
                  hex: String
                }
              ]
            }
          ]
        }
      ],
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
  paymentIntentId: {
    type: String,
    trim: true
  },


  shippedDate: Date,
  estimatedDelivery: Date,

  date: {
    type: Date,
    default: Date.now
  },
  shippingData: {
    quotation_id: { type: String },
    selected_rate: {
      id: String,
      provider: String,
      service_level: {
        name: String,
        token: String,
      },
      total: String,
      days: Number,
      currency: String,
    },
    shipment: {
      id: String,
      tracking_number: String,
      status: String,
      label_url: String,
      estimated_delivery: String,
      created_at: String,
    }
  },

  logs: [
    {
      action: String,
      message: String,
      metadata: Object,
      performedBy: {
        type: String,
        enum: ['system', 'customer', 'admin'],
        default: 'system'
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]

}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);
