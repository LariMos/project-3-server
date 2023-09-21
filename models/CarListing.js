import mongoose from 'mongoose';

const carListingSchema = new mongoose.Schema({
  Make: {
    type: String,
  },
  Model: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Category: {
    type: String,
  },
  Mileage: {
    type: Number,
  },
  Condition: {
    type: String,
  },
  Description: {
    type: String,
  },
  Date: { 
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [{
    type: String,
  }],
});

const CarListing = mongoose.model('CarListing', carListingSchema);

export default CarListing;
