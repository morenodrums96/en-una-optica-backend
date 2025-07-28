import express from 'express'
import { getWishlistByAnonymousId,toggleWishlistProduct ,getWishlistProducts} from '../controllers/wishlist.controller.js'

const router = express.Router()

router.get('/wishlist', getWishlistByAnonymousId)
router.post('/wishlist/toggle', toggleWishlistProduct)
router.post('/wishlist/products', getWishlistProducts)

export default router
