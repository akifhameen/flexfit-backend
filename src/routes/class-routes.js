import express from 'express';
import { addClass, getAllClasses, getClassAvailability, removeClassById } from '../controllers/class-controller';

const router = express.Router();

router.post('/classes/addClass', addClass);
router.get('/classes/getAllClasses', getAllClasses);
router.delete('/classes/removeClass/:classId', removeClassById);
router.get('/classes/classAvailability/:day', getClassAvailability);