import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export const createUser = async (req, res) => {
  const {firstName, lastName, email, password, role} = req.body;
  let checkUserEmail, hashedPassword;

  try {
    checkUserEmail = await User.findOne({ email: email });
  } catch (error) {
  }

  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser, userData, isValidPassword;

  try {
    existingUser = await User.findOne({ email: email });
    // @ts-ignore
    userData = existingUser.toObject({ getters: true });
  } catch (error) {
  }

  if (!existingUser) {
    console.log('no user found');
  }

  try {
    // @ts-ignore
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch(error) {}

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