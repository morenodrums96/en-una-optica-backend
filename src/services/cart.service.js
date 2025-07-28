import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'

export const getCartByAnonymousIdService = async (anonymousId) => {
  return await Cart.findOne({ anonymousId })
}

export const addToCartService = async (anonymousId, newItem) => {
  let cart = await Cart.findOne({ anonymousId })

  if (!cart) {
    cart = await Cart.create({
      anonymousId,
      productItems: [{ ...newItem, quantity: 1 }],
    })
    return cart
  }

  const existingItem = cart.productItems.find(item =>
    item.productId.toString() === newItem.productId &&
    JSON.stringify(item.selectedOptions || {}) === JSON.stringify(newItem.selectedOptions || {})
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.productItems.push({ ...newItem, quantity: 1 })
  }

  await cart.save()
  return cart
}



export const getCartProductsService = async (anonymousId) => {
  const cart = await Cart.findOne({ anonymousId })
  if (!cart || cart.productIds.length === 0) return []

  const products = await Product.find({ _id: { $in: cart.productIds } })
  return products
}

export const removeCartProductService = async (anonymousId, productId, selectedOptions) => {
  const cart = await Cart.findOne({ anonymousId })
  if (!cart) return null

  // Filtrar el producto exacto por ID y configuración
  cart.productItems = cart.productItems.filter((item) => {
    const sameId = item.productId.toString() === productId.toString()
    const sameOptions = JSON.stringify(item.selectedOptions || {}) === JSON.stringify(selectedOptions || {})
    return !(sameId && sameOptions)
  })

  await cart.save()
  return cart
}

export const updateCartQuantityService = async (anonymousId, productId, selectedOptions, newQuantity) => {
  const cart = await Cart.findOne({ anonymousId })
  if (!cart) return null

  const itemIndex = cart.productItems.findIndex(item =>
    item.productId.toString() === productId.toString() &&
    JSON.stringify(item.selectedOptions || {}) === JSON.stringify(selectedOptions || {})
  )

  if (itemIndex === -1) return null

  const product = await Product.findById(productId)
  if (!product || !product.variants || product.variants.length === 0) return null

  const stock = product.variants[0].quantity // asumiendo primer variant

  if (newQuantity > stock) {
    return { error: `Solo hay ${stock} unidades disponibles en stock` }
  }

  cart.productItems[itemIndex].quantity = newQuantity
  await cart.save()

  return cart
}