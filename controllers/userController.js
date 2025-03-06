import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req, res) =>{
   const { email, password} = req.body;
   try {
      const user = await userModel.findOne({email});
      if(!user){
        res.json({success :false, message: "user does not exist"});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        res.json({success: false, message:"Invalid credentials"});
      }
      const token = createToken(user._id);
      res.json({success: true, token})
   } catch (error) {
    res.json({success: false, message:"Something went wrong"})
    
   }

}
//creating token method
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//registerng

const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email})
        //check existing user
        if(exist){
            res.status(400).json({message: 'User already exist', success: false})
        }
        //validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'Enter a valid email', success: false})

        }
        if(password.length < 8){
            return res.status(400).json({message: 'Password must be atleast 8 characters', success: false})
        }
        //hash password
        const salt = await bcrypt.genSalt(10);//reange 5-15
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const newUser = await userModel.create({
            name : name, 
            email: email,
            password: hashedPassword}) 
        const user = await newUser.save();

        //create token
            const token = createToken(user._id);
            res.json({success: true, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', success: false})
        
    }

}

export {loginUser, registerUser}