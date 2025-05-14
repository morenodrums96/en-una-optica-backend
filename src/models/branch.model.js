import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    stree: {
        type: String,
        required: true,
        trim: true,
    },
    externalNumber: {
        type: String,
        required: true,
        trim: true,
    },
    internalNumber: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
    neighborhood: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true
});

export const Branch = mongoose.model('Branch',branchSchema);