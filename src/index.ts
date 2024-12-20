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

const app=express();

dotenv.config()
app.use(cors())
app.use(logger);
app.use(express.json())


app.use('/Hauberge',router)
app.use('/auth',authRouter)

app.use('/user',userRouter);
const port=process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo';


mongoose.connect(dbURI).then(()=>{
    console.log('Connected to database');
}
).catch((err)=>{
    console.log('Error connecting to database');
    console.log(err);
})

app.use('/Hauberge',router)
app.use('/reservations',ReservationRoute)
app.use('/transport',transportRoute)

app.listen(port,()=>{
    console.log('Server is running on port '+port);
    })
        
