import mongoose from 'mongoose';

const userSubscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

const UserSubscription = mongoose.model('UserSubscription', userSubscriptionSchema);

export { UserSubscription };