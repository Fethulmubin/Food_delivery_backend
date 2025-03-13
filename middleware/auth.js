import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) =>{
    const token = req.cookies?.token;
    if(!token){
        return res.json({success: false, message: 'Unauthorized user'})

    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"});
    }
}

export default authMiddleware;