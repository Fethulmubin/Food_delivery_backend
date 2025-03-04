import foodModel from "../models/foodModels.js";
import fs from "fs";

//add foods

const addFood = async (req, res)=>{
    let image_filename = req.file.filename;

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
        res.json({foods: foods, sucess: true});
    }
    catch(err){
        res.json({message: err});
    }

}
//remove food items
const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        // await food.remove();
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({message: 'food removed successfully'});
    } catch (error) {
        res.json({message: error, success: false});
    }

}

export {addFood, listFood, removeFood};