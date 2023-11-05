import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
});

const Credit = mongoose.model('Credit', creditSchema);

export { Credit };