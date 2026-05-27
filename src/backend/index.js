import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routers/user.router.js';
import { driverRouter } from './routers/driver.router.js';
import { rideRouter } from './routers/rides.router.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/rides", rideRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}....`);
});