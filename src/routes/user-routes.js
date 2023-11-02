import express from "express";
import { createUser, login } from "../controllers/user-controller.js";

const router = express.Router();

router.post('/users/new', createUser);

router.get('/login', login);

export {router as userRoutes};