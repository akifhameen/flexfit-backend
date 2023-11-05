import mongoose from 'mongoose';
import { app } from './app.js';
import { FLEXFIT_PORT, FLEXFIT_DB_CONNECTION_URI } from './utils/env.js';
import { initData } from './initData.js';

const PORT = FLEXFIT_PORT;

mongoose
  .connect(`${FLEXFIT_DB_CONNECTION_URI}`)
  .then(() => {
    console.log('Connected to MongoDB');
    initData().then(() => {
      app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!!!`);
      });
    })
  })
  .catch(e => {
    console.log(e);
  });