import express from "express";
import * as userController from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", userController.register_user);
userRouter.post("/login", userController.login_user);
userRouter.use(userController.verify_token);
userRouter.get("/verifyToken", userController.verify_token);

export default userRouter;
