import express from "express";
import register_user from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", register_user);

export default userRouter;
