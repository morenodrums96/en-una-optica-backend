// src/controllers/s3.controller.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export const getPresignedUrl = async (req, res) => {
  try {
    const { fileType } = req.query

    const timestamp = Date.now()
    const extension = fileType.split('/')[1] || 'jpg'
    const fileName = `EnUnaOptica-${timestamp}.${extension}`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

    return res.json({ url: signedUrl, fileName }) // 👈 incluye fileName
  } catch (error) {
    console.error('Error generating signed URL:', error)
    res.status(500).json({ message: 'Error generating signed URL' })
  }
}

