import { Class } from "../models/class";
import { Timeslot } from "../models/timeslots";
import { Trainer } from "../models/trainer";
import { TrainerSchedule } from "../models/trainerSchedule";

// @ts-ignore
export const addClass = async(req, res) => {
  const { type, description, trainerId, startTime, day } = req.body;
  let createdClass, timeslot, trainer;

  try {
    timeslot = await Timeslot.findOne({ day, startTime });
  } catch (e) {}

  if (!timeslot) {
    console.log('no timeslot');
  }
  // @ts-ignore
  timeslot.classId = createdClass;

  try {
    trainer = await Trainer.findOne({ userId: trainerId });
  } catch (e) {}

  if (!trainer) {
    console.log('no trainer');
  }
  // @ts-ignore
  trainer.remainingSlots -= 1;

  const newClass = new Class({
    type,
    description,
    trainerId: trainer,
    timeslotId: timeslot
  });
  const trainerSchedule = new TrainerSchedule({
    timeslotId: timeslot,
    trainerId: trainer
  });
  
  try {
    // @ts-ignore
    createdClass = await newClass.save();
    // @ts-ignore
    await timeslot.save();
    // @ts-ignore
    await trainer.save();
    // @ts-ignore
    await trainerSchedule.save();
    // @ts-ignore
    res.json({ ...createdClass, day: timeslot.day, time: `${timeslot.startTime}-${timeslot.endTime}` });
  } catch (e) {}
};

// @ts-ignore
export const getAllClasses = async(req, res) => {
  let allClasses;

  try {
    allClasses = await Class.find().populate('timeslotId');
  } catch (e) {}

  // @ts-ignore
  const allClassesArray = allClasses.map(eachClass => {
    return {
      // @ts-ignore
      id: eachClass._id,
      // @ts-ignore
      type: eachClass.type,
      // @ts-ignore
      description: eachClass.description,
      // @ts-ignore
      day: eachClass.timeslotId.day,
      // @ts-ignore
      time: `${eachClass.timeslotId.startTime}-${eachClass.timeslotId.endTime}`
    };
  })
  res.send(allClassesArray);
};

export const removeClassById = async(req, res) => {
  const classId = req.params.classId;
  let classToRemove;

  try {
    classToRemove = Class.findById(classId);
  } catch (e) {}

  if (!classToRemove) {
    console.log("no class");
  }

  try {
    // @ts-ignore
    await classToRemove.remove();
  } catch (e) {}

  res.json({ message: 'Class removed' })
};