import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const frontEndUrl = 'http://localhost:5173'
const  frontEndUrl= 'https://food-delivery-b8hs.onrender.com'
//placing user order for frontend

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount:req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData: {}});

        //stripe
        const line_items = req.body.items.map((item)=>({
            price_data :{
                currency: "USD",
                product_data : {
                    name:item.name
                },
                unit_amount :item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data :{
                currency: "USD",
                product_data : {
                    name:"Delivery Charges"
                },
                unit_amount : 2*100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${frontEndUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontEndUrl}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true, session_url: session.url})
    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }

}

const verifyPayment = async (req, res) =>{
    try {
        const {orderId, success} = req.body;
        if(success){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message:"Not Paid"})
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }
   

}

const userOrders = async (req, res) =>{ 
   try {
    const orders = await orderModel.find({userId: req.body.userId});
    res.json({success: true, orders});

   } catch (error) {
    res.json({success:false, message: error.message});
   }
}
//listing all orders for admin
const listOrder = async (req, res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
//updating order status for admin
const updateStatus = async (req, res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        res.json({success: false, message:error.message});
    }
}

export {placeOrder, verifyPayment, userOrders, listOrder, updateStatus}