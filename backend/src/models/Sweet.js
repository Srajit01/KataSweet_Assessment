const mongoose = require('mongoose');

const SweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sweet name is required'],
    trim: true,
    maxlength: [100, 'Sweet name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['chocolate', 'candy', 'gummy', 'hard candy', 'toffee', 'lollipop', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0.01, 'Price must be at least 0.01']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/1684718/pexels-photo-1684718.jpeg'
  }
}, {
  timestamps: true
});

SweetSchema.index({ name: 'text', category: 'text' });
SweetSchema.index({ price: 1 });
SweetSchema.index({ category: 1 });

module.exports = mongoose.model('Sweet', SweetSchema);