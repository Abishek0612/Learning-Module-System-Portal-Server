//import necessary things
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const User=require("../models/UserModel");


//Define a middleware function for authentication->
const protect=asyncHandler(async(req,res,next)=>{
    let token;
    //check if req.headers contains authorization header with starting Bearer
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try {
       //if the header exist,split to get token part
        token=req.headers.authorization.split(' ')[1];
        //verify token using ->verify->tokena& secret key
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //use id from the decoded token->exclude password
        req.user=await User.findById(decoded.id).select("-password");

        next();  
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized,no token")
        }
    }
})

module.exports={protect};