import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    alias: {
        type: String, // Ej: 'Casa', 'Oficina', 'Mamá'
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    externalNumber: {
        type: String,
        trim: true
    },
    internalNumber: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        trim: true
    },
    neighborhood: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    aditionalReferents: {
        type: String,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Address = mongoose.model('Address', addressSchema);
