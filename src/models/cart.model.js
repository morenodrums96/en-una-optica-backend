import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    anonymousId: { type: String, required: true, unique: true },
    productItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        selectedOptions: { type: Object, default: {} },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalToPay: { type: Number, default: 0 }, // 👈 nuevo campo
  },
  { timestamps: true }
)

export const Cart = mongoose.model('Cart', cartSchema)
