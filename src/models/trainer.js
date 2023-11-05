import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User', unique: true },
  picture: { type: String, required: false },
  description: { type: String, required: false },
  availableSlots: { type: Number, required: true },
  remainingSlots: { type: Number, required: true }
});

trainerSchema.pre('save', async(next) => {
  try {
    // @ts-ignore
    const user = await mongoose.model('User').findById(this.userId);
    // @ts-ignore
    if (this.remainingSlots <= 0) {
      throw new Error('trainer isn\'t unavailable.');
    }
    if (user && user.role === 'trainer') {
      next();
    } else {
      throw new Error('User must have the role "trainer".');
    }
  } catch (error) {
    next(error);
  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

export { Trainer };