import mongoose from "mongoose";

const connectdb = () =>{
    mongoose.connect(process.env.MONGO_URI).then(
        (data)=>{console.log("The database has been connected to", data.connection.host)}
    ).catch((error)=>{
        console.log(error)
    })
} 


module.exports = connectdb;