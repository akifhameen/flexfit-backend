import HttpError from "../models/http-error.js";
import { Timeslot } from "../models/timeslots.js";
import { Trainer } from "../models/trainer.js";
import { TrainerSchedule } from "../models/trainerSchedule.js";
import { User } from "../models/user.js";

export const hireTrainer = async(req, res, next) => {
  const { userId, trainerId, day, startTime } = req.body;
  let user, trainer, timeslot, trainerSchedule;

  user = await User.findById(userId).populate('UserSubscription');
  trainer = await Trainer.findById(trainerId);
  timeslot = await Timeslot.find({ day, startTime })

  // @ts-ignore
  if (user.userSubscriptionId.plan !== 'premium') {
    const error = new HttpError('User does not have a required subscription!', 401);
    next(error);
    // @ts-ignore
  } else if (trainer.remainingSlots === 0) {
    const error = new HttpError('Trainer does not have remaining slots!', 403);
    next(error);
  }

  trainerSchedule = new TrainerSchedule({
    timeslotId: timeslot,
    trainerId: trainer,
    type: 'personal'
  });

  // @ts-ignore
  trainerSchedule.save();
  res.json({ message: 'Trainer hired!' });
};

export const getTrainerAvailability = async(req, res, next) => {
  const { trainerId, day } = req.body;
  let trainer, trainerTakenSlotIds, trainerAvailableSlots, availableSlotData;

  trainer = await Trainer.findById(trainerId);
  // @ts-ignore
  if(trainer.remainingSlots === 0) {
    const error = new HttpError('Trainer does not have remaining slots!', 403);
    next(error);
  }

  // @ts-ignore
  trainerTakenSlotIds = (await TrainerSchedule.find({ trainerId })).map(slot => { return slot.timeslotId });
  trainerAvailableSlots = await Timeslot.find({
    _id: { $nin: trainerTakenSlotIds },
    day: day
  });

  availableSlotData = trainerAvailableSlots.map(slot => {
    return {
      // @ts-ignore
      id: slot._id,
      // @ts-ignore
      startTime: slot.startTime,
      // @ts-ignore
      timePeriod: `${slot.startTime}-${slot.endTime}`
    }
  });

  res.json(availableSlotData);
};

export const getTrainerList = async(req, res) => {
  const trainers = (await Trainer.find({ remainingSlots: { $gt: 0 } }).populate('User')).map(trainer => {
    return {
      // @ts-ignore
      id: trainer._id,
      // @ts-ignore
      name: `${trainer.userId.firstName} ${trainer.userId.lastName}`,
    }
  });

  res.json(trainers);
};