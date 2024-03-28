import { Request, Response } from "express";
import create_user from "../services/userService";

const register_user = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    await create_user(req, res);
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(`Error creating user: ${error}`);
  }
};

export default register_user;
