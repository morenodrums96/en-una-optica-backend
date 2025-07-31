import mongoose from 'mongoose';

const anonymousCustomerSchema = new mongoose.Schema({
  anonymousId: {
    type: String,
    required: true,
    unique: true,
  },
  openpayCustomerId: {
    type: String,
    required: true,
  },
  email: String,
  name: String,
  phone: String,
  address: {
    city: String,
    line1: String,
    line2: String,
    postal_code: String,
    state: String,
    country_code: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const AnonymousCustomer = mongoose.model('AnonymousCustomer', anonymousCustomerSchema)
