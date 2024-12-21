import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/haubegre';
import ReservationRoute from './routes/reservations';
import { logger } from './middlwares/logger';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import transportRoute from './routes/transport';
import { BlackListRouter } from './routes/blackList';
import { gemRouter } from './routes/aiRoutes';
import { EmployeeRouter } from './routes/employee';
//init Config
const port=process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo';
dotenv.config()
const app=express();
dotenv.config()
//usage of middlwared
app.use(cors())
app.use(logger);
app.use(express.json())
//ROutes

app.use('/Hauberge',router)
app.use('/auth',authRouter)

app.use('/user',userRouter);
app.use('/blacklist',BlackListRouter);
app.use('/Hauberge',router)
app.use('/reservations',ReservationRoute)
app.use('/transport',transportRoute)
app.use('/employees',EmployeeRouter)
app.use('/ai',gemRouter)
//Trying to connect to the db

mongoose.connect(dbURI).then(()=>{
//Starting the server after Ensuring db is connected
 app.listen(port,()=>{
    console.log('Server is running on port '+port);
    })
    console.log('Connected to database');
}
).catch((err)=>{
    console.log('Error connecting to database');
    console.log(err);
})

       
