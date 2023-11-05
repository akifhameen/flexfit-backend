import { Timeslot } from '../models/timeslots.js';

export const timeslotInit = async() => {
  let bulkData = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  let day, startTime, endTime;

  const existingDataCount = await Timeslot.countDocuments();
    if (existingDataCount === 0) {
    for (const eachDay in days) {
      day = eachDay;
      for (let i = 6; i < 22; i++) {
        startTime = `${ i }:00`;
        endTime = `${ i + 1 }:00`;
        bulkData.push({ day, startTime, endTime });
      }
    }

    await Timeslot.insertMany(bulkData);
    console.log('timeslotInit done!');
  }
};