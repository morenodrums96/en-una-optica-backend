import dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';
import path from 'path';
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});


function generarNombreArchivoPersonalizado(originalExt) {
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const año = ahora.getFullYear();
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');
  const segundo = String(ahora.getSeconds()).padStart(2, '0');

  return `EnUnaOptica_${dia}${mes}${año}_${hora}${minuto}${segundo}${originalExt}`;
}

export const uploadImageToS3 = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Archivo no enviado' });

    const extension = path.extname(file.originalname);
    const fileName = generarNombreArchivoPersonalizado(extension);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Subir el archivo original
    await s3.upload(params).promise();

    // Convertir el archivo a formato .webp (simulado)
    const optimizedFileName = fileName.replace(/\.[^.]+$/, '.webp');
    const optimizedUrl = `https://enunaoptica-optimized-images.s3.${process.env.AWS_REGION}.amazonaws.com/${optimizedFileName}`;

    // Devolver la URL del archivo optimizado
    res.status(200).json({ url: optimizedUrl });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
};


// 🗑️ ELIMINAR imagen de S3
export const deleteImageFromS3 = async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ error: 'URL no proporcionada' })
  }

  try {
    const urlObj = new URL(url)
    const Key = decodeURIComponent(urlObj.pathname).replace(/^\/+/, '')

    await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key,
      })
      .promise()

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error al eliminar imagen de S3:', error)
    res.status(500).json({ error: 'Error al eliminar imagen' })
  }
}
