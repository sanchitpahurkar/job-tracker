import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import jobRouter from './routes/jobRoutes.js';
dotenv.config();
import cors from 'cors';


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDB();

// routes
app.use('/jobs', jobRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`✅ Backend running on port ${port}`);    
});