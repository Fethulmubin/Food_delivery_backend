import mongoose from 'mongoose';
 const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }, 
   
 });
 // Create a model from the schema
 //you can access the already created model using mongoose.models.food
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

 export default foodModel;