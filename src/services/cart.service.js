import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'

export const getCartByAnonymousIdService = async (anonymousId) => {
  return await Cart.findOne({ anonymousId })
}

export const addToCartService = async (anonymousId, newItem) => {
  let cart = await Cart.findOne({ anonymousId })

  // 1. Buscar el producto para conocer su precio
  const product = await Product.findById(newItem.productId)
  if (!product) {
    throw new Error('Producto no encontrado')
  }

  // 2. Obtener el precio según si tiene descuento
  const unitPrice = product.hasDiscount
    ? product.discountedPriceWithVAT
    : product.customerPrice

  if (!cart) {
    // 3. Crear el carrito si no existe
    const totalToPay = unitPrice * 1
    cart = await Cart.create({
      anonymousId,
      productItems: [{ ...newItem, quantity: 1 }],
      totalToPay,
    })
    return cart
  }

  // 4. Buscar si ya existe ese producto con esas opciones
  const existingItem = cart.productItems.find(item =>
    item.productId.toString() === newItem.productId &&
    JSON.stringify(item.selectedOptions || {}) === JSON.stringify(newItem.selectedOptions || {})
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.productItems.push({ ...newItem, quantity: 1 })
  }

  // 5. Recalcular el totalToPay del carrito completo
  let totalToPay = 0

  for (const item of cart.productItems) {
    const productData = await Product.findById(item.productId)
    if (!productData) continue

    const price = productData.hasDiscount
      ? productData.discountedPriceWithVAT
      : productData.customerPrice

    totalToPay += price * item.quantity
  }

  cart.totalToPay = totalToPay
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

  // 🔁 Recalcular totalToPay
  let totalToPay = 0

  for (const item of cart.productItems) {
    const productData = await Product.findById(item.productId)
    if (!productData) continue

    const price = productData.hasDiscount
      ? productData.discountedPriceWithVAT
      : productData.customerPrice

    totalToPay += price * item.quantity
  }

  cart.totalToPay = totalToPay
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

  const stock = product.variants[0].quantity // Asumiendo primer variant

  if (newQuantity > stock) {
    return { error: `Solo hay ${stock} unidades disponibles en stock` }
  }

  cart.productItems[itemIndex].quantity = newQuantity

  // 🔁 Recalcular totalToPay
  let totalToPay = 0

  for (const item of cart.productItems) {
    const productData = await Product.findById(item.productId)
    if (!productData) continue

    const price = productData.hasDiscount
      ? productData.discountedPriceWithVAT
      : productData.customerPrice

    totalToPay += price * item.quantity
  }

  cart.totalToPay = totalToPay
  await cart.save()

  return cart
}