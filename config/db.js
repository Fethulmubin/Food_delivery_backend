import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async ()=>{
   await mongoose.connect('mongodb+srv://fetihul:UxmK1WQSlvOZrkjV@cluster0.k3vs2.mongodb.net/Food_delivery').then(()=>console.log('db connected')).catch(err => console.error('Connection error', err));
   // mongoose.set('serverSelectionTimeoutMS', 5000);
}