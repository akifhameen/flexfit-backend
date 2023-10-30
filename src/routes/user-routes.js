import express from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/user-controller.js";

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/users/new', createUser);

router.get('/users/:userId', getUserById);

export {router as userRoutes};