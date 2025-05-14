import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  secondName: {
    type: String,
    required: true,
    trim: true,
  },
  secondLastName: {
    type: String,
    trim: true,
  },
  cellphone: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  email: {
    type: String,
    trim: true,
  },
  wantsOffers: {
    type: Boolean,
    default: false,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  lensPrescriptions: {
    graduation: Boolean,
    prescription: String,
    isSunGlasses: Boolean,
    isPhotochromic: Boolean,
    leftEye: {
      hasPrescription: Boolean,
      prescription: String
    },
    rightEye: {
      hasPrescription: Boolean,
      prescription: String
    },
    extra: String,
    comments: String
  },
  shipments: {
    orderId: String,
    carrier: String,
    pickupAtCarrierOffice: Boolean,
    status: String,
    shippedDate: Date,
    estimatedDelivery: Date,
    deliveryAddress: {
      street: String,
      externalNumber: String,
      internalNumber: String,
      postalCode: String,
      neighborhood: String,
      city: String,
      state: String,
      aditionalReferents: String
    }
  },
  schedule: {
    appointmentDate: Date,
    branch: String
  }
}, {
  timestamps: true
});

export const Customer = mongoose.model('Customers', customerSchema);
