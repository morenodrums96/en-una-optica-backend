import { getWishlistByAnonymousIdService,toggleWishlistProductService,getWishlistProductsService } from '../services/wishlist.service.js'

export const getWishlistByAnonymousId = async (req, res) => {
  try {
    const { anonymousId } = req.query
    if (!anonymousId) return res.status(400).json({ message: 'anonymousId es requerido' })

    const wishlist = await getWishlistByAnonymousIdService(anonymousId)
    res.status(200).json({ productIds: wishlist?.productIds || [] })
  } catch (error) {
    console.error('Error al obtener wishlist:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const toggleWishlistProduct = async (req, res) => {
  try {
    const { anonymousId, productId } = req.body
    if (!anonymousId || !productId) {
      return res.status(400).json({ message: 'anonymousId y productId son requeridos' })
    }

    const updatedWishlist = await toggleWishlistProductService(anonymousId, productId)
    res.status(200).json({ productIds: updatedWishlist.productIds })
  } catch (error) {
    console.error('Error al actualizar wishlist:', error)
    res.status(500).json({ message: 'Error interno al actualizar el wishlist' })
  }
}


export const getWishlistProducts = async (req, res) => {
  try {
    const { anonymousId } = req.body
    if (!anonymousId) return res.status(400).json({ message: 'anonymousId es requerido' })

    const products = await getWishlistProductsService(anonymousId)
    res.status(200).json({ products })
  } catch (error) {
    console.error('Error al obtener productos del wishlist:', error)
    res.status(500).json({ message: 'Error interno al obtener productos del wishlist' })
  }
}