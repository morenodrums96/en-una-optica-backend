import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    trim: true,
    enum: ['lensColor', 'frameMaterial', 'faceShape', 'frameShape','color','expenses'] 
  },
  label: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Catalog = mongoose.model('Catalog', catalogSchema);
