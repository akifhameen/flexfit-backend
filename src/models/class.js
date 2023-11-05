import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  trainerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Trainer' },
});

const Class = mongoose.model('Class', classSchema);

export { Class };