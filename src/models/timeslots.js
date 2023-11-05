import mongoose from 'mongoose';

const timeslotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  classId: { type: mongoose.Types.ObjectId, required: false, ref: 'Class' },
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);

export { Timeslot };