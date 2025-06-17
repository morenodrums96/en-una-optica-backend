// src/routes/s3.route.js
import express from 'express'
import { getPresignedUrl } from '../controllers/s3.controller.js'

const router = express.Router()

router.get('/sign-url', getPresignedUrl)

export default router
