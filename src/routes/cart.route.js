import express from 'express'
import { getCartByAnonymousId, addToCartController, getCartProducts, removeCartProduct, updateCartQuantity } from '../controllers/cart.controller.js'

const router = express.Router()

router.get('/cart', getCartByAnonymousId)
router.post('/cart/add', addToCartController)
router.post('/Cart/products', getCartProducts)
router.post('/cart/remove', removeCartProduct)
router.put('/cart/updateQuantity', updateCartQuantity)

export default router
