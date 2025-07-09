const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const sharp = require('sharp');

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    // Obtener imagen original
    const originalImage = await S3.getObject({ Bucket: bucket, Key: key }).promise();

    // Procesarla con Sharp
    const optimizedImage = await sharp(originalImage.Body)
      .resize(800)
      .webp({ quality: 80 })
      .toBuffer();

    // Guardarla en otro bucket o subcarpeta
    const destBucket = 'enunaoptica-optimized-images';
    const destKey = key.replace(/\.[^.]+$/, '.webp');

    await S3.putObject({
      Bucket: destBucket,
      Key: destKey,
      Body: optimizedImage,
      ContentType: 'image/webp',
    }).promise();

    return { statusCode: 200, body: 'Imagen procesada con éxito' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Error procesando la imagen' };
  }
};
