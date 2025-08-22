import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        mongoose.connection.on(
            'connected' , () => console.log(
                "Database Connected"
            )
        );
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "hotel-booking", // ✅ safer way
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    catch (error) {
        console.log(error.message);
    }
};

export default connectDB;