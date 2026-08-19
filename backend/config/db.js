const mongoose=require('mongoose');

const connectDB = async()=>{
    try{
        const cnn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch(error){
        console.log('MongoDb connection failed:',error.message);
        process.exit(1);
    }
};
module.exports=connectDB;