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
  openpayCustomerId: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  wantsOffers: {
    type: Boolean,
    default: false,
  },
  isGuest: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    trim: true,
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
  schedule: {
    appointmentDate: Date,
    branch: String
  }
}, {
  timestamps: true
});

export const Customer = mongoose.model('Customers', customerSchema);
