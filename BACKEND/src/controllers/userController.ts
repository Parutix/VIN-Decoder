// userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";
import bcrypt from "bcrypt";

export const register_user = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userCreated = await userService.create_user(user);
    if (userCreated) {
      res.status(201).send("User created successfully");
    } else {
      res.status(400).send("User creation failed");
    }
  } catch (error) {
    res.status(400).send(`Error creating user: ${error}`);
  }
};

export const login_user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.get_user(email, password);

    if (!result || !result.user) {
      res.status(404).send("Invalid Credentials");
    } else {
      res.status(200).json({ message: "Login succesful", token: result.token });
    }
  } catch (error) {
    res.status(400).send(`Error logging in: ${error}`);
  }
};
