import HttpError from '../models/http-error.js';
import { User } from '../models/user.js';
import { UserSubscription } from '../models/userSubscription.js';

export const buySubscription = async(req, res, next) => {
  const { userId, plan } = req.body;
  let expirationDate = new Date();
  expirationDate = new Date(expirationDate.setDate(expirationDate.getDate() + 30));
  let existingUser;

  const newSubscription = new UserSubscription({
    plan,
    expirationDate,
    userId
  });

  try {
    existingUser = await User.findById(userId);
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'No user found, please sign in.',
      404
    );
    return next(error);
  }

  try {
    // @ts-ignore
    const result = await newSubscription.save();
    // @ts-ignore
    existingUser.userSubscriptionId = existingSubscription;
    // @ts-ignore
    existingUser.save();
    res.json({ plan: result.plan });
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }
}

export const updateSubscription = async(req, res, next) => {
  const { userId, plan } = req.body;
  let existingSubscription, existingUser;

  try {
    existingSubscription = await UserSubscription.findOne({ userId });
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingSubscription) {
    const error = new HttpError(
      'Couldn\'t find the existing subscription, please try again later.',
      404
    );
    return next(error);
  }

  // @ts-ignore
  existingSubscription.plan = plan;
  // @ts-ignore
  const currentExpirationDate = existingSubscription.expirationDate;
  // @ts-ignore
  existingSubscription.expirationDate = new Date(currentExpirationDate.setDate(currentExpirationDate.getDate() + 30));
  
  try {
    existingUser = await User.findById(userId);
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'No user found, please sign in.',
      404
    );
    return next(error);
  }

  try {
    // @ts-ignore
    await existingSubscription.save();
    // @ts-ignore
    existingUser.userSubscriptionId = existingSubscription;
    // @ts-ignore
    existingUser.save();
    // @ts-ignore
    res.json({ plan: existingSubscription.plan, expirationdate: existingSubscription.expirationdate });
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, please try again later.',
      500
    );
    return next(error);
  }
}