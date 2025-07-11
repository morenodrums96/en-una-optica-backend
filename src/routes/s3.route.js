import express from 'express'
import multer from 'multer'
import { uploadImageToS3 } from '../controllers/s3.controller.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload-image', upload.single('file'), uploadImageToS3)

export default router
