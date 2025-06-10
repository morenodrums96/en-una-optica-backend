import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  secondName: {
    type: String,
    trim: true,
  },
  secondLastName: {
    type: String,
    trim: true,
  },
  cellphone: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  personalEmail: {
    type: String,
    trim: true,
  },
  companyEmail: {
    type: String,
    trim: true,
    required: true,
    unique: true, // <- importante si no quieres duplicados
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido']
  },

  passwordHash: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true
  },
  rol: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
  },
  direction: {
    street: {
      type: String,
      trim: true,
    },
    externalNumber: {
      type: String,
      trim: true,
    },
    internalNumber: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    }
  }
}, {
  timestamps: true
});

export const Employer = mongoose.model('Employer', employerSchema);
