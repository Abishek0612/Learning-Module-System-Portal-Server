const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv").config();

const connectDB=require("./config/db");


const port=process.env.PORT||5000;

connectDB();

const app=express();

//enabling cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));







app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})