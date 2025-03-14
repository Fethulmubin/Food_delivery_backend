import userModel from '../models/userModel.js'; 

//add items to user cart
 const addToCart = async (req, res) =>{

    try {
        // console.log(req.body.userId)
        let userData = await userModel.findOne({_id: req.body.userId});
        // console.log(userData._id);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
             cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Item added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
        
    }
 }

 //remove cart items
 const removerFromCard = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -=1;
         }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message:"Item removed successfully"})
    } catch (error) {
        res.json({success:false, message:error.message});
    }
    
 }

 // fetch user cart data

 const getCart = async (req, res) => {
    try {
        console.log(req.body.userId);
        
        // Await the database query
        let userData = await userModel.findById(req.body.userId);

        let cartData = userData.cartData;
        console.log(cartData);

        // If cartData is empty or undefined
        if (!cartData) {
            return res.json({ success: false, message: "You haven't added any items" });
        }

        res.json({ success: true, cartData: cartData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

 export { addToCart, removerFromCard, getCart}