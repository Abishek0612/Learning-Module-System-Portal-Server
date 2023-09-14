//import necessary library and modules
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const asyncHandler=require("express-async-handler");
const User=require("../models/UserModel");


const getData=async(req,res)=>{
    res.send(`<h1>Hello.Server is running</h1>`);
}

//Define a function to register new user
const registerUser=async(req,res)=>{
    //get the user info from req.body
    const {name,email,password}=req.body;
    try {
        //check if user already exist
        const userExist=await User.findOne({email});
        
        if(userExist){
            res.status(400);
            throw new Error("User already Exist");
        }
        //create a new user 
        const user=await User.create({
            name, 
            email,
            password
        })
        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
            })
        }else{
            res.status(400);
            throw new Error("Invalid User data")
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


//Define a function to handle Login 
const loginUser=asyncHandler(async(req,res)=>{
    //get user email and password
    const {email,password}=req.body;
    //check  if user with given email exist in db 
    const user=await User.findOne({email});
    if(user&&(await bcrypt.compare(password,user.password))){
        console.log("User logged in");
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }
})


//Define a function to get user data 
const getMe=asyncHandler(async(req,res)=>{
    const{_id,name,email}=await User.findById(req.user._id);
    res.status(200).json({
        id:_id,
        name,
        email
    });
});



//Define a function to Generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
};



module.exports={
    registerUser,
    loginUser,
    getMe,
    getData
}