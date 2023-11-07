import express, { json } from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user-routes.js';
import { userSubscriptionRoutes } from './routes/userSubscription-routes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());

app.use(userRoutes);
app.use(userSubscriptionRoutes);

export { app };