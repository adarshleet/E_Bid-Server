import mongoose from 'mongoose'

export const dbConnect = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("connected to database");
    }
    catch(error){
        console.log(error.message);
    }
}