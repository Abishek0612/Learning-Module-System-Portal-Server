//import
const express=require("express");
//import all the controller
const { getCourses, getAllCourses, getCoursesById, setCourse, updateCourse, deleteCourse,}=require("../controllers/courseController");
//create router object
const router=express.Router();


//Define a route for getting a list of courses
router.get("/",getCourses);
//getting all
router.get("/all",getAllCourses);
//getting a course by id
router.get("/:id",getCoursesById);

//add course
router.post("/addcourse",setCourse);

//router for updating and deleteing a course by its id
router.route("/:id").put(updateCourse).delete(deleteCourse);


//exports router to server
module.exports=router;