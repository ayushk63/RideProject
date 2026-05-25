import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routers/user.router.js';
import { driverRouter } from './routers/driver.router.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/drivers", driverRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}....`);
});