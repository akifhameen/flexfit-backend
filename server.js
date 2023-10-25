import mongoose from 'mongoose';
import { app } from './app.js';

const PORT = process.env.FLEXFIT_PORT || 5000;
const DBConnectionURI = process.env.FLEXFIT_DB_CONNECTION_URI

mongoose.connect(`${DBConnectionURI}`);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});