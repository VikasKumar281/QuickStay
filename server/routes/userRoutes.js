import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities, syncUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/sync', syncUser);
userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

export default userRouter;
