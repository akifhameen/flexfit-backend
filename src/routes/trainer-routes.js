import express from 'express';
import { getAllAvailableTrainers, getAllTrainers, getTrainerAvailability, hireTrainer } from '../controllers/trainer-controller.js';

const router = express.Router();

router.post('/trainers/hire', hireTrainer);
router.get('/trainers/getTrainerAvailability/:trainerId/:day', getTrainerAvailability);
router.get('/traimers/allAvailableTrainers', getAllAvailableTrainers);
router.get('/trainers/getAllTrainers', getAllTrainers)

export {router as userRoutes};