import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontEndUrl = 'http://localhost:5173'
//placing user order for frontend

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            item: req.body.items,
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

export {placeOrder}