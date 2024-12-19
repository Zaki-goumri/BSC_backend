import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/haubege';

dotenv.config()
const app=express();

app.use(express.json())

app.use('/Hauberge',router)
const port=process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo';

mongoose.connect(dbURI).then(()=>{
    console.log('Connected to database');
}
).catch((err)=>{
    console.log('Error connecting to database');
    console.log(err);
})

app.listen(port,()=>{
    console.log('Server is running on port '+port);
    })
        
