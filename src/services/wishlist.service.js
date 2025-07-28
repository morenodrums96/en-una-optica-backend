import { Wishlist } from '../models/wishlist.model.js'
import { Product } from '../models/product.model.js'

export const getWishlistByAnonymousIdService = async (anonymousId) => {
  return await Wishlist.findOne({ anonymousId })
}

export const toggleWishlistProductService = async (anonymousId, productId) => {
  const wishlist = await Wishlist.findOne({ anonymousId })

  if (!wishlist) {
    const newWishlist = await Wishlist.create({
      anonymousId,
      productIds: [productId],
    })
    return newWishlist
  }

  const alreadyExists = wishlist.productIds.includes(productId)

  if (alreadyExists) {
    wishlist.productIds = wishlist.productIds.filter(id => id !== productId)
  } else {
    wishlist.productIds.push(productId)
  }

  await wishlist.save()
  return wishlist
}


export const getWishlistProductsService = async (anonymousId) => {
  const wishlist = await Wishlist.findOne({ anonymousId })
  if (!wishlist || wishlist.productIds.length === 0) return []

  const products = await Product.find({ _id: { $in: wishlist.productIds } })
  return products
}