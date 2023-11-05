import express, { json } from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user-routes.js';
import { userSubscriptionRoutes } from './routes/userSubscription-routes.js';

const app = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(json());

app.use(userRoutes);
app.use(userSubscriptionRoutes);

export { app };