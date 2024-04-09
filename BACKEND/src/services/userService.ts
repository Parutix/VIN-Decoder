import { Request, Response } from "express";
import User from "../entities/userEntity";
import validator from "validator";
import { getManager } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create_user = async (user: User) => {
  try {
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
    const existingUser = await entityManager.findOne(User, {
      where: { email: user.email },
    });
    if (existingUser) {
      throw new Error("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = entityManager.create(User, user);
    await entityManager.save(newUser);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const get_user = async (email: string, password: string) => {
  try {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, { where: { email } });
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return { user };
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};
