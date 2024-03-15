import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import path,{ dirname }  from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { dbConnect } from './config/dbConnect.js';
import { userRoute } from './routes/userRoutes.js';
import { itemsRoute } from './routes/itemsRoute.js';
import { bidRoute } from './routes/bidsRoute.js';

// Load environment variables
dotenv.config();

// Connect to the database
dbConnect();

const app = express();

app.use(cors({
    origin: process.env.CORS_URL, // Replace with the origin from which requests are allowed
    credentials: true // Allow credentials
}));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users',userRoute);
app.use('/items',itemsRoute)
app.use('/bids',bidRoute)

app.listen(3000, () => {
    console.log('Connected to server');
});