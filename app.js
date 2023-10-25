import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: '*',
    })
);

app.use(json());

export { app };