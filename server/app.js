import express from 'express';

import authRoutes from './routes/authRoutes.js'

const app = express();

//Setting JSON limit.
app.use(express.json({limit: '16kb'}));

//Setting URL Encoded limit.
app.use(express.urlencoded({extended: true , limit: '16kb'}));

// routes addition
app.use("/api/auth", authRoutes);


export {app};