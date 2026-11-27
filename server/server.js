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
import contactRouter from "./routes/contactRoutes.js";
import subscriberRouter from "./routes/subscriberRoutes.js";




connectDB();
connectCloudinary();


const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://quickstay-one-inky.vercel.app",
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, origin || true);
      return;
    }
    callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.post("/api/clerk", express.raw({ type: "application/json" }), clerkWebHooks);

// Middleware ----------------->
app.use(express.json());
app.use(clerkMiddleware());


app.get('/' , (req , res) => res.send("API is working"));

app.use('/api/user' , userRouter);
app.use('/api/hotels' , hotelRouter);
app.use('/api/rooms' , roomRouter);
app.use('/api/bookings' , bookingRouter);
app.use('/api/contact' , contactRouter);
app.use('/api/subscribe' , subscriberRouter);


const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT , () => console.log(`Server running on port ${PORT}`));
}

export default app; 