import mongoose from 'mongoose';

const trainerScheduleSchema = new mongoose.Schema({
  timeslotId: { type: mongoose.Types.ObjectId, required: false, ref: 'TimeslotSchema' },
  trainerId: { type: mongoose.Types.ObjectId, required: false, ref: 'Trainer' },
  type: { type: String, required: true }
});

const TrainerSchedule = mongoose.model('TrainerSchedule', trainerScheduleSchema);

export { TrainerSchedule };