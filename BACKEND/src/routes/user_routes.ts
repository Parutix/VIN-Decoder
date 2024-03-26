import express from "express";
import { insert_user } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/allusers", insert_user);

export default userRouter;
