import mongoose from 'mongoose';

const anonymousFavoriteSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const AnonymousFavorite = mongoose.model('AnonymousFavorite', anonymousFavoriteSchema);
