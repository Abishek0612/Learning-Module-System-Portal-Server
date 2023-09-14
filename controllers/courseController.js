//import necessary modules and models
const asyncHandler=require("express-async-handler");
const Course=require("../models/courseModel");
const Section=require("../models/sectionModel");
const Video=require("../models/VideoModel");
const Quiz=require("../models/quizModel");


//Define a function to get Course
const getCourses=asyncHandler(async(req,res)=>{
    //get all courses from the db
    const courses=await Course.find();
    //send it as response
    res.status(200).json(courses);
})


//Define a function to get specific course by its ID
const getCoursesById=asyncHandler(async(req,res)=>{
    //extract id parameter
    const id=req.params.id;
    //find course by its id and populate section field
    const course=await Course.findById(id).populate("sections");
    //send res.
    res.status(200).json(course);
})

//Define a function to create a new course
const setCourse=asyncHandler(async(req,res)=>{
    //create a new course object data from req.body
    const course=new Course({
        course_name:req.body.course_name,
        course_details:req.body.course_details,
        author:req.body.author,
        level:req.body.level,
        category:req.body.category,
        course_img:req.body.course_img
    });


    //save new course to db
    const savedCourse=await course.save();

    //iterate over sections & add them to course
    if(req.body.sections){
        for(let i=0;i<req.body.sections.length;i++){
            const section=req.body.sections[i];

            //create a new section
            const newSection=new Section({
                section_name:section.section_name,
                section_text:section.section_text
            });

            //save section to db
            const savedSection=await newSection.save();

            //iterate over videos in section 
            if(section.videos){
                for(let j=0;j<section.videos.length;j++){
                    const video=section.video[j];

                    //create a new Video Object with data
                    const newVideo=new Video({
                        video_url:video.video_url,
                        video_title:video.video_title,
                    });

                    //save video to db
                    const savedVideo=await newVideo.save();

                    //add video Id to section Video_id array
                    savedSection.video_ids.push(savedVideo._id);

                

                  //Add quizzed to the section
                  if(section.quizzes){
                    for(let k=0;k<section.quizzes.length;k++){
                        const quiz=section.quizzes[k];
                        const newQuiz=new Quiz({
                            quiz_title:quiz.quiz_title,
                            quiz_questions:quiz.quiz_questions,
                            quiz_options:quiz.quiz_options,
                            quiz_answer:quiz.quiz_answer
                        })

                        //save
                        const savedQuiz=await newQuiz.save();

                        //add quiz to section 
                        savedSection.quiz_ids.push(savedQuiz._id);
                    }
                    
                  }
                  //Add Section to course
                  savedCourse.sections.push(savedSection._id);

                }
            }
            //Save the courses with added sections,videos and quizzes
            const updatedCourse=await savedCourse.save();

            res.status(201).json(updatedCourse);
        }
    }

})


