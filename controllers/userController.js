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
        return res.json({success :false, message: "user does not exist"});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.json({success: false, message:"Invalid credentials"});
      }
      const token = createToken(user._id);
      res.cookie("token", token, {
        // httpOnly: true, // Prevents JavaScript access (protection against XSS)
        // secure: true, // Only send over HTTPS (disable in local development
        sameSite: "lax", // Prevents CSRF attack
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });
      res.json({success: true, token})
   } catch (error) {
    res.json({success: false, message:"Something went wrong"})
    
   }

}
//creating token method during login
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
//registering

const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email})
        //check existing user
        if(exist){
           return res.status(400).json({message: 'User already exist', success: false})
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
            res.cookie("token", token, {
                // httpOnly: true, // Prevents JavaScript access (protection against XSS)
                // secure: true, // Only send over HTTPS (disable in local development)
                sameSite: "lax", // Prevents CSRF attacks
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            });
        
            // res.json({ message: "Logged in successfully!" })
            res.json({success: true, token});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong', success: false})
        
    }

}
const logout = (req, res) =>{
    const token = req.cookies?.token;
    if(!token){
       return res.json({success: false, message:"unauthorized user"});
    }
    res.clearCookie('token');
    res.json({success:true ,message:"successfully logged out"})
}

const validate = (req, res) => {
    const token = req.cookies?.token;
    if(!token){
        return res.json({success: false, message:"unauthorized user"});
    }
    res.json({success:true, token:token});
}

//reurning all customers for admin
const customers = async (req, res) => {
    try {
        const users = await userModel.countDocuments();
        res.json({success: true, users: users});
    } catch (error) {
        res.json({success: false, message: 'Something went wrong'});
    }
}

export {loginUser, registerUser, logout, validate, customers}