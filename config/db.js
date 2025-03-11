import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
   try {
     const DB_Connection = await mongoose.connect(process.env.DB_URI)
     console.log('DB connected')
   } 
   catch (error) {
      console.error('Connection error', error.message)
   } 
  
} 

