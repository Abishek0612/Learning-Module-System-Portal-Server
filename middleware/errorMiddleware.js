//Define an error handling middleware 
const errorHanlder=(err,req,res,next)=>{
    //
    const statusCode=res.statusCode?res.statusCode:500;

    //set http response 
    res.status(statusCode);
    res.json({
        message:err.message,
        //if its production->hide status code message
        stack:process.env.NODE_ENV==='production'?null:err.stack,
    });
};


module.exports={
    errorHanlder,
};