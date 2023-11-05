import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import HttpError from '../models/http-error.js';

export const createUser = async (req, res, next) => {
  const {firstName, lastName, email, password, role} = req.body;
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
    role
  });

  try {
    // @ts-ignore
    const result = await user.save();
    const getUser = result.toObject({ getters: true });
    delete getUser.password;
    delete getUser._id;
    delete getUser.__v;
    res.json(getUser);
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
  let existingUser, userData, isValidPassword;

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

  // @ts-ignore
  delete userData.password;
  // @ts-ignore
  delete userData._id;
  // @ts-ignore
  delete userData.__v;

  res.json({
    isAuthenticated: true,
    user: userData
  });
};