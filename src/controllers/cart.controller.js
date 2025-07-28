import { getCartByAnonymousIdService, addToCartService, getCartProductsService, removeCartProductService, updateCartQuantityService } from '../services/cart.service.js'
import { Product } from '../models/product.model.js'

export const getCartByAnonymousId = async (req, res) => {
  try {
    const { anonymousId } = req.query
    if (!anonymousId) {
      return res.status(400).json({ message: 'anonymousId es requerido' })
    }

    const cart = await getCartByAnonymousIdService(anonymousId)
    const items = cart?.productItems || []

    if (items.length === 0) {
      return res.status(200).json({ cartItems: [] })
    }

    const productIds = items.map(item => item.productId)
    const products = await Product.find({ _id: { $in: productIds } })

    const cartItems = items.map(item => {
      const product = products.find(
        p => p._id.toString() === item.productId.toString()
      )

      return {
        productId: item.productId,
        name: product?.name || 'Producto desconocido',
        customerPrice: product?.customerPrice || 0,
        discountedPriceWithVAT: product?.discountedPriceWithVAT || 0, // ✅ Agregado
        variantImage:
          product?.variants?.[0]?.images?.[0] ||
          product?.variants?.[0]?.image ||
          '',
        selectedOptions: item.selectedOptions || {},
        quantity: item.quantity || 1,
      }
    })

    return res.status(200).json({ cartItems })
  } catch (error) {
    console.error('Error al obtener cart:', error)
    return res.status(500).json({ message: 'Error interno al obtener carrito' })
  }
}


export const addToCartController = async (req, res) => {
  try {
    const { anonymousId, item } = req.body
    if (!anonymousId || !item?.productId) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const updatedCart = await addToCartService(anonymousId, item)
    res.status(200).json({ cart: updatedCart })
  } catch (error) {
    console.error('Error al agregar al carrito:', error)
    res.status(500).json({ message: 'Error interno al agregar al carrito' })
  }
}



export const getCartProducts = async (req, res) => {
  try {
    const { anonymousId } = req.body
    if (!anonymousId) return res.status(400).json({ message: 'anonymousId es requerido' })

    const products = await getCartProductsService(anonymousId)
    res.status(200).json({ products })
  } catch (error) {
    console.error('Error al obtener productos del cart:', error)
    res.status(500).json({ message: 'Error interno al obtener productos del wishlist' })
  }
}

export const removeCartProduct = async (req, res) => {
  try {
    const { anonymousId, productId, selectedOptions } = req.body

    if (!anonymousId || !productId) {
      return res.status(400).json({ message: 'anonymousId y productId son requeridos' })
    }

    const updatedCart = await removeCartProductService(anonymousId, productId, selectedOptions)
    return res.status(200).json({ cartItems: updatedCart.productItems })
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error)
    return res.status(500).json({ message: 'Error interno al eliminar del carrito' })
  }
}

export const updateCartQuantity = async (req, res) => {
  try {
    const { anonymousId, productId, selectedOptions, quantity } = req.body

    if (!anonymousId || !productId || !quantity) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const updatedCart = await updateCartQuantityService(anonymousId, productId, selectedOptions, quantity)

    if (updatedCart?.error) {
      return res.status(400).json({ message: updatedCart.error })
    }

    if (!updatedCart) {
      return res.status(404).json({ message: 'Carrito no encontrado o producto no existe' })
    }

    return res.status(200).json({ cartItems: updatedCart.productItems })
  } catch (error) {
    console.error('Error al actualizar cantidad:', error)
    return res.status(500).json({
      message: error?.message || 'Error interno al actualizar cantidad',
    })
  }
}