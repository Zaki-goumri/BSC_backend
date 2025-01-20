import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/haubegre';
import ReservationRoute from './routes/reservations';
import { logger } from './middlwares/logger'
import cors from 'cors';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import transportRoute from './routes/transport';
import { BlackListRouter } from './routes/blackList';
import { gemRouter } from './routes/aiRoutes';
import { EmployeeRouter } from './routes/employee';

// Init Config
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(logger());
app.use(express.json());

// Routes
app.use('/Hauberge', router);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blacklist', BlackListRouter);
app.use('/reservations', ReservationRoute);
app.use('/transport', transportRoute);
app.use('/employees', EmployeeRouter);

// Server & DB Config
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/BSC';

mongoose.connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });