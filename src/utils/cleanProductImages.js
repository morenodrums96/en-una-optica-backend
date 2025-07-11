// utils/cleanProductImages.js
import { deleteFilesFromS3 } from '../controllers/s3.controller.js'

export const getKeyFromUrl = (url) => {
    if (!url || typeof url !== 'string' || url.startsWith('blob:')) return null
    const parts = url.split('/')
    return parts[parts.length - 1]
}

export const extractKeysFromVariants = (variants = []) => {
    const keys = []

    for (const variant of variants) {
        if (variant.image) keys.push(getKeyFromUrl(variant.image))
        if (Array.isArray(variant.images)) {
            keys.push(...variant.images.map(getKeyFromUrl))
        }
    }

    return keys.filter(Boolean)
}

export const cleanupS3Images = async (oldVariants = [], newVariants = []) => {
    const oldKeys = new Set(extractKeysFromVariants(oldVariants))
    const newKeys = new Set(extractKeysFromVariants(newVariants))

    const keysToDelete = [...oldKeys].filter(key => !newKeys.has(key))
    if (keysToDelete.length > 0) {
        console.log('🔴 Eliminando de S3:', keysToDelete) // ← agrega esta línea
        await deleteFilesFromS3(keysToDelete)
    }
}
