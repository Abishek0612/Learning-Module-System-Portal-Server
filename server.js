const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv").config();
const {errorHanlder}=require("./middleware/errorMiddleware");
const connectDB=require("./config/db");


const port=process.env.PORT||5000;

connectDB();

const app=express();

//enabling cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorHanlder);




//call routes
app.use("/api/users",require("./routes/userRoutes"));


const {registerUser}=require("./controllers/userController");
const {loginUser}=require("./controllers/userController");
const {getMe}=require("./controllers/userController");

app.post("/api/users/register",registerUser);
app.post("/api/users/login",loginUser);
app.get("/api/users/me",getMe);

app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})