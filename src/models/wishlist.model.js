import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema(
  {
    anonymousId: {
      type: String,
      required: true,
      unique: true,
    },
    productIds: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // incluye createdAt y updatedAt
  }
)

export const Wishlist = mongoose.model('Wishlist', wishlistSchema)
