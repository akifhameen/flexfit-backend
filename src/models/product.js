import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String, required: true },
  trainerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Trainer' },
});

const Product = mongoose.model('Product', productSchema);

export { Product };