import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Connect to MongoDB
export const connectDB = async () => {
   try {
     const DB_Connection = await mongoose.connect(process.env.DB_URI)
     console.log('DB connected')
   } 
   catch (error) {
      console.error('Connection error', error.message)
   } 


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: Images will be stored in this folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
   public_id: (req, file) => `${Date.now()}--${file.originalname}`
  },
});

module.exports = {
  cloudinary,
  storage,
};

  
} 

