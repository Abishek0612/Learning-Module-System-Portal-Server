//import mongoose 
const mongoose=require("mongoose");
//set up configuration option to enfore strict query structure
mongoose.set("strictQuery",true);
//Define a function to establish Mongodb connection
const connectDB=async()=>{
    try {
        //connect to MONGODB data ->mongourl
        const conn=await mongoose.connect(process.env.MONGO_URL);

        //provide a message if connection is successful
        console.log(`Mongodb connection established: ${conn.connection.host}`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
//export
module.exports=connectDB;
