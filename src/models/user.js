import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, required: true },
  userSubscriptionId: { type: mongoose.Types.ObjectId, required: false, ref: 'UserSubscription' },
  trainerIds: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Trainer' }],
  classIds: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Class' }]
});

const User = mongoose.model('User', userSchema);

export { User };