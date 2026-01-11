import express from 'express';

import authRoutes from './routes/authRoutes.js'

const app = express();

// middlewares
app.use(express.json());

// routes addition
app.use("/api/auth", authRoutes);

app.get("/" , (req , res)=> {
  res.end("Express page here...")
})


app.listen(3000 , ()=> {
  console.log(`Server running on http://localhost:3000`)
})