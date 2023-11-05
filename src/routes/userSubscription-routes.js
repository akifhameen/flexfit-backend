import express from 'express';
import { buySubscription, updateSubscription } from '../controllers/userSubscription-controller.js';

const router = express.Router();

router.post('/userSubscriptions/new', buySubscription);
router.put('/userSubscriptions/update', updateSubscription);

export {router as userSubscriptionRoutes};