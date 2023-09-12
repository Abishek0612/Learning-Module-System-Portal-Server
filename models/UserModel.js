//import mongoose 
const mongoose=require("mongoose");
//import bcrypjs
const bcrypt=require("bcryptjs");
//Define the structure of user document
const userSchema=mongoose.Schema(
    {
     //name field
        name:{
            type:String,
            required:[true,"Please add a name"],
        },
     //email field
        email:{
            type:String,
            required:[true,"Please add an email"],
            unique:true
        },

        password:{
            type:String,
            required:[true,"Please add a password"],
        },
    },
    {
        //automatically track createdat and updatedat
        timestamps:true
    }

);
//Define ->middle ware function which run before saving the data into user document
userSchema.pre("save",async function(next){
    //check if password fields is chnaged or not
    if(!this.isModified('password')){
        next();
    }

    //Generate a salt for password 
    const salt=await bcrypt.genSalt(10);

    //has the user password with generated salt
    this.password=await bcrypt.hash(this.password,salt);
})


//create and export user model 

module.exports=mongoose.model('User',userSchema);