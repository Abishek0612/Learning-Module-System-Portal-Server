//import library
const mongoose=require("mongoose");

const courseSchema=mongoose.Schema(
    {
        id:{type:String},
        course_name:{
            type:String,
            required:[true,"Please add course Name"]
        },
        course_details:{type:String,required:true},
        author:{type:String,required:true},
        level:{type:String,required:true},

        section:[
            {
                section_name:{type:String},
                section_text:{type:String},
                video_title:{type:String},
                video_url:{type:String}
            },
        ],
        category:{type:String,required:true},
        course_img:{type:String,default:""},

    },

    {
        timestamps:true,
    }
);


module.exports=mongoose.model("course",courseSchema);