import mongoose from 'mongoose';
const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  hex: {
    type: String, // ejemplo: "#FFFFFF"
    trim: true
  },
  enabled: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  }
});
const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  enabled: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  availableColors: [colorSchema]

});

const configurableOptionSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
    trim: true
  },
  groupDescription: String,

  allowMultiple: {
    type: Boolean,
    default: true // si pueden seleccionar más de una opción del grupo
  },

  options: [optionSchema],

  enabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const ConfigurableOption = mongoose.model('ConfigurableOption', configurableOptionSchema);
