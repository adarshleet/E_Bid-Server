import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './config/dbConnect.js';
import { userRoute } from './routes/userRoutes.js';
import { itemsRoute } from './routes/itemsRoute.js';
import { bidRoute } from './routes/bidsRoute.js';

// Load environment variables
dotenv.config();

// Connect to the database
dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users',userRoute);
app.use('/items',itemsRoute)
app.use('/bids',bidRoute)

app.listen(3000, () => {
    console.log('Connected to server');
});