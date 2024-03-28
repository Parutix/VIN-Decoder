import { Request, Response } from "express";
import User from "../entities/userEntity";
import validator from "validator";
import { getManager } from "typeorm";
import connectToDatabase from "../database/database";

const create_user = async (req: Request, res: Response) => {
  try {
    await connectToDatabase(); // Establish the database connection
    const user: User = req.body;

    if (!validator.isEmail(user.email)) {
      throw new Error("Invalid email address!");
    }
    if (user.username.length < 5) {
      throw new Error("Username must be at least 5 characters long!");
    }
    if (user.password.length < 8) {
      throw new Error("Password must be at least 8 characters long!");
    }

    const entityManager = getManager();
    const newUser = entityManager.create(User, user);
    await entityManager.save(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export default create_user;
