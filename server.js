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
app.use("/api/courses",require("./routes/courseRoutes"));

//call courseModel schema here
const course=require("./models/courseModel");


//newcourse
app.post("/newCourse",async(req,res)=>{
    //extract info from req.body
    const id=req.body.id;
    const CourseName=req.body.coursename;
    const CourseDescription=req.body.description;
    const Author=req.body.author;
    const Level=req.body.level;
    const Category=req.body.category;
    const CourseImage=req.body.courseImage;


    //create new object and insert above parameter to course schema
    const courseData=new course({
        id:id,
        course_name:CourseName,
        course_details:CourseDescription,
        author:Author,
        level:Level,
        category:Category,
        course_img:CourseImage
    })


    //save this ddata to db
    try {
        await courseData.save();

        res.send("Inserted Datat Successfully...")
        
    } catch (error) {
        console.log(error);
    };

});


//newSection
app.put("/newSection",async(req,res)=>{
    
    const id=req.body.id;
    const courseName=req.body.coursename;
    const sectionName=req.body.section;
    const sectionDescription=req.body.description;
    const videoTitle=req.body.video;
    const videoURL=req.body.url;


    try {

        const updatedCourse=await course.findOneAndUpdate(
            {course_name:courseName},
            {
                $push:{
                    sections:{
                        section_name:sectionName,
                        section_text:sectionDescription,
                        video_title:videoTitle,
                        video_url:videoURL,

                    },
                },
            },
            {new:true}
        );

        if(!updatedCourse){
            return res.status(404).send("Course not Found");
        }

        res.send("Updated Data Successfully");

        
    } catch (error) {
        console.log(error);
        res.status(500).send("An internal server error encountered")
    }

})


const {registerUser}=require("./controllers/userController");
const {loginUser}=require("./controllers/userController");
const {getMe}=require("./controllers/userController");
// const {getData}=require("./controllers/userController");


app.post("/api/users/register",registerUser);
app.post("/api/users/login",loginUser);
app.get("/api/users/me",getMe);
// app.get("/",getData);


app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})