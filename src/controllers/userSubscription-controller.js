import { User } from '../models/user.js';
import { UserSubscription } from '../models/userSubscription.js';

export const buySubscription = async(req, res) => {
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
  } catch (error) {}

  if (!existingUser) {
    console.log('no user found');
  }

  try {
    // @ts-ignore
    const result = await newSubscription.save();
    // @ts-ignore
    existingUser.userSubscriptionId = existingSubscription;
    // @ts-ignore
    existingUser.save();
    res.json({ plan: result.plan });
  } catch (error) {}
}

export const updateSubscription = async(req, res) => {
  const { userId, plan } = req.body;
  let existingSubscription, existingUser;

  try {
    existingSubscription = await UserSubscription.findOne({ userId });
  } catch (error) {}

  // @ts-ignore
  existingSubscription.plan = plan;
  // @ts-ignore
  const currentExpirationDate = existingSubscription.expirationDate;
  // @ts-ignore
  existingSubscription.expirationDate = new Date(currentExpirationDate.setDate(currentExpirationDate.getDate() + 30));
  
  try {
    existingUser = await User.findById(userId);
  } catch (error) {}

  if (!existingUser) {
    console.log('no user found');
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
  } catch (error) {}
}