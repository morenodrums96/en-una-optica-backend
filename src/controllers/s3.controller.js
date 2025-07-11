// src/controllers/s3.controller.js

import dotenv from 'dotenv'
dotenv.config()

import AWS from 'aws-sdk'
import path from 'path'
import { randomBytes } from 'crypto'

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
})

function generarNombreArchivoPersonalizado(originalExt) {
  const ahora = new Date()
  const dia = String(ahora.getDate()).padStart(2, '0')
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const año = ahora.getFullYear()
  const hora = String(ahora.getHours()).padStart(2, '0')
  const minuto = String(ahora.getMinutes()).padStart(2, '0')
  const segundo = String(ahora.getSeconds()).padStart(2, '0')
  const random = randomBytes(3).toString('hex') // asegura nombres únicos

  return `EnUnaOptica_${dia}${mes}${año}_${hora}${minuto}${segundo}_${random}${originalExt}`
}

// ✅ SUBIR imagen a S3
const uploadImageToS3 = async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'Archivo no enviado' })

    const extension = path.extname(file.originalname)
    const fileName = generarNombreArchivoPersonalizado(extension)

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    await s3.upload(params).promise()

    const optimizedFileName = fileName.replace(/\.[^.]+$/, '.webp')
    const optimizedUrl = `https://enunaoptica-optimized-images.s3.${process.env.AWS_REGION}.amazonaws.com/${optimizedFileName}`

    res.status(200).json({ url: optimizedUrl })
  } catch (error) {
    console.error('Error al subir imagen:', error)
    res.status(500).json({ error: 'Error al subir imagen' })
  }
}

const deleteFilesFromS3 = async (keys = []) => {
  if (keys.length === 0) return

  const params = {
    Bucket: process.env.AWS_OPTIMIZED_BUCKET_NAME,
    Delete: {
      Objects: keys.map(Key => ({ Key })),
      Quiet: false
    }
  }

  await s3.deleteObjects(params).promise()
}

export {
  uploadImageToS3,
  deleteFilesFromS3
}