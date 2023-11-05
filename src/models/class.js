import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  trainerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Trainer' },
  timeslotId: { type: mongoose.Types.ObjectId, required: true, ref: 'Timeslot' }
});

const Class = mongoose.model('Class', classSchema);

export { Class };