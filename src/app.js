import express, { json } from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user-routes.js';

const app = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(json());

app.use(userRoutes);

export { app };