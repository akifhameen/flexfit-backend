import express from 'express';
import { createUser, enrollOrQuitClass, getUserByEmail, login, updateRoleByEmail } from '../controllers/user-controller.js';

const router = express.Router();

router.post('/users/signUp', createUser);
router.post('/users/signIn', login);
router.put('/users/enrollOrQuitClass', enrollOrQuitClass);
router.get('/users/getUserByEmail', getUserByEmail);
router.put('/users/updateRoleByEmail', updateRoleByEmail)

export {router as userRoutes};