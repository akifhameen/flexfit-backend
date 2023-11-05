import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import HttpError from '../models/http-error.js';
import { UserSubscription } from '../models/userSubscription.js';

export const createUser = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;
  let checkUserEmail, hashedPassword;

  try {
    checkUserEmail = await User.findOne({ email: email });
  } catch (e) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (checkUserEmail) {
    const error = new HttpError('Email already exists in the system', 409)
    return next(error)
  }

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  } 

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: 'member'
  });

  try {
    // @ts-ignore
    const result = await user.save();
    const getUser = result.toObject({ getters: true });
    delete getUser.password;
    delete getUser._id;
    delete getUser.__v;
    res.json({
      isAuthenticated: true,
      user: getUser
    });
  } catch (e) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser, userData, isValidPassword, userSubscription;

  try {
    existingUser = await User.findOne({ email: email });
    // @ts-ignore
    userData = existingUser.toObject({ getters: true });
  } catch (e) {
    const error = new HttpError(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  try {
    // @ts-ignore
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch(e) {
    const error = new HttpError(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  if (userData.userSubscriptionId) {
    try {
      userSubscription = await UserSubscription.findById(userData.userSubscriptionId);
    } catch (e) {
      const error = new HttpError(
        'Loggin in failed, please try again later.',
        500
      );
      return next(error);
    }

    if (!userSubscription) {
      const error = new HttpError(
        'Loggin in failed due to subscription error, please contact administration.',
        404
      );
      return next(error);
    }

    const today = new Date();
    // @ts-ignore
    if (userSubscription.expirationDate >= today) {
      // @ts-ignore
      userData.plan = userSubscription.plan
    }
  }

  delete userData.password;
  delete userData._id;
  delete userData.__v;

  res.json({
    isAuthenticated: true,
    user: userData
  });
};

export const enrollOrQuitClass = async(req, res) => {
  const { userId, classId } = req.body;
  let user, updatedUser;

  try {
    user = await User.findById(userId);
  } catch (e) {}

  if (!user) {
    console.log('no user')
  }

  // @ts-ignore
  if (user.classIds.length > 0) {
    // @ts-ignore
    const newClassIds = user.classIds.map(eachClassId => eachClassId.toString()).filter(eachClassId => { return eachClassId !== classId });
    // @ts-ignore
    user.classIds = newClassIds;
  } else {
    // @ts-ignore
    user.classIds.push(classId);
  }

  try {
    // @ts-ignore
    updatedUser = await user.save();
    // @ts-ignore
    updatedUser = updatedUser.toObject({ getters: true });
    delete updatedUser.password;
    delete updatedUser._id;
    delete updatedUser.__v;
  } catch (e) {}
  res.send(updatedUser)
};

export const getUserByEmail = async(req, res) => {
  const email = req.body.email;
  let user;

  try {
    user = await User.findOne(email);
    // @ts-ignore
    user = user.toObject({ getters: true });
  } catch (e) {}

  delete user.password;
  delete user._id;
  delete user.__v;

  res.send(user);
}

export const updateRoleByEmail = async(req, res) => {
  const { email, role } = req.body;
  let user, updatedUser;

  try {
    user = await User.findOne(email);
  } catch (e) {}

  // @ts-ignore
  user.role = role;

  try {
    // @ts-ignore
    updatedUser = await user.save();
  } catch (e) {}

  res.json({ email: updatedUser.email, role: updatedUser.role })
}