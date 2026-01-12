import express from 'express';
import dotenv from 'dotenv';

// FILES IMPORT
import authRoutes from './routes/authRoutes.js'

dotenv.config();

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