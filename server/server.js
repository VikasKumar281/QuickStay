import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebHooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";




connectDB();
connectCloudinary();


const app = express();


// Enable Cross-Origin Resource Sharing -------------------------------------------->
app.use(cors({
  // origin: ["http://localhost:5173", "https://quickstay-one-inky.vercel.app"],
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// Middleware ----------------->
app.use(express.json());
app.use(clerkMiddleware());


// API to listen Clerk Webhook -------------------------------------->
app.use("/api/clerk" , clerkWebHooks);


app.get('/' , (req , res) => res.send("API is working"));

app.use('/api/user' , userRouter);
app.use('/api/hotels' , hotelRouter);
app.use('/api/rooms' , roomRouter);
app.use('/api/bookings' , bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`)); 