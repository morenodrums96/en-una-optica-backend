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
  lastName: String,
  phone: String,
  address: {
    postal_code: String,
    state: String,
    city: String,
    neighborhood: String,
    street: String,
    externalNumber: String,
    internalNumber: String,
    aditionalReferents: String,
    country_code: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const AnonymousCustomer = mongoose.model('AnonymousCustomer', anonymousCustomerSchema)
