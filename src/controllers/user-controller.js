import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
  
  if (!users) {
    res.status(404).json({ message: 'No users found!' });
  }
  res.json(users);
};

export const createUser = async (req, res) => {
  const {firstName, lastName, email, password, role} = req.query;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    role
  });
  try {
    const result = await user.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', error: error });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.userId;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }

  if (!user) {
    res.status(404).json({ message: 'User not found!' });
  }
  res.json(user);
};