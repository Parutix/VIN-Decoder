import { Request, Response } from "express";
import * as userService from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const data = req.body;
    const result = await userService.get_user(data.email, data.password);
    const token = jwt.sign(data, "vinsecretkey", { expiresIn: "1h" });

    if (!result || !result.user) {
      res.status(401).send("Invalid Credentials");
    } else {
      res.status(200).json({ message: "Login succesful", token });
    }
  } catch (error) {
    res.status(400).send(`Error logging in: ${error}`);
  }
};

export const verify_token = async (req: Request, res: Response) => {
  const tokenHeader = req.headers.authorization;
  const secret_key = "vinsecretkey";
  if (!tokenHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const token = tokenHeader.split(" ")[0];
  console.log(token);
  jwt.verify(token, secret_key, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(200).json({ message: "Token is valid" });
  });
};
