import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import gigRoutes from './routes/gigRoutes.js';
// import bidRoutes from './routes/bidRoutes.js';

const app = express();

//Setting JSON limit.
app.use(express.json({limit: '16kb'}));

//Setting URL Encoded limit.
app.use(express.urlencoded({extended: true , limit: '16kb'}));

// cookie parser
app.use(cookieParser());

// routes addition
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
// app.use("/api/bids", bidRoutes);

export {app};