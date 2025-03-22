import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config.js';
import cookieParser from "cookie-parser";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();
const port = process.env.PORT || 9000;

// cloudname =dezckzjzf
// apikey = 877175912835829
// apisecret =jbVGfpTSx9Uu6YQuLnwEfOwhfUI
// CLOUDINARY_URL=cloudinary://877175912835829:jbVGfpTSx9Uu6YQuLnwEfOwhfUI@dezckzjzf

//middleware
const allowedOrigins = [
  'http://localhost:5173',       // frontend
  'http://localhost:5174',       // admin
    // deployed admin panel
]
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true // if you're using cookies or sessions
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


//DB config
connectDB();

//api routes end point
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter)
// app.use('/images', express.static('uploads'));
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter);

// connectDB();
  //the order of req and res is important
  
app.listen(port, ()=>{ 
  // connectDB();
  console.log(`listening on localhost:${port}`)
    
});
// UxmK1WQSlvOZrkjV
