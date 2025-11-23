import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;
if (CLIENT_URL) {
    app.use(cors({ origin: CLIENT_URL }));
} else {
    app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDB();

// routes
app.use('/jobs', jobRouter);
app.use('/', authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
        console.log(`✅ Backend running on port ${port}`);    
});