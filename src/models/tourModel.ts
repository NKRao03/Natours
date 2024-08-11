import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    required: true,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 500,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],
    trim: true,
  },
  startDates: {
    type: [Date],
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const tourModel = mongoose.model('Tour', tourSchema);

export { tourModel };
