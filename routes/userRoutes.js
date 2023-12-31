const express=require("express");
const router=express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    getData
}=require("../controllers/userController")

const {protect}=require("../middleware/authMiddleware");

//redirect with http methods
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",protect,getMe);
router.get("/",getData);



module.exports=router;
