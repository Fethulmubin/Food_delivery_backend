import foodModel from "../models/foodModels.js";
import fs from "fs";

// Increase DNS timeout setting

//add foods function

const addFood = async (req, res)=>{
    let image_filename = req.file.path;

     const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
     });
     try{
         const savedFood = await food.save();
         res.json({ food: savedFood, message: 'food added successfully' ,success : true});
     }
     catch(err){
        console.log(err)
         res.json({message: err});
       
     }  
}
//all list of foods
const listFood = async (req, res)=>{
    try
    {
        const foods = await foodModel.find();
        // console.log(foods)
        res.json({ foods, success: true});
    }
    catch(err){
     res.json({message: err, success:false});
    }

}
//remove food items
const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        // await food.remove();
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({message: 'food removed successfully', success:true});
    } catch (error) {
        res.json({message: error, success: false});
    }

}

export {addFood, listFood, removeFood};