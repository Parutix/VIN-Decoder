import express from "express";
import * as userController from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";
const userRouter = express.Router();

userRouter.post("/register", userController.register_user);
userRouter.post("/login", userController.login_user);

export default userRouter;
