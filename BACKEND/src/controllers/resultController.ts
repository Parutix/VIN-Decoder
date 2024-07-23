import { Request, Response } from "express";
import * as resultService from "../services/resultService";

export const createResult = async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const resultCreated = await resultService.create_result(result);
    if (resultCreated) {
      res.status(201).send("Result created successfully");
    } else {
      res.status(400).send("Result creation failed");
    }
  } catch (error) {
    res.status(400).send(`Error crreseating result: ${error}`);
  }
};

export const get_last_ten_results = async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.query.user_id as string, 10);
    if (isNaN(user_id)) {
      return res.status(400).send("Invalid user_id");
    }
    const results = await resultService.get_last_ten_results(user_id);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(400).send("Error getting results");
    }
  } catch (error) {
    res.status(400).send(`Error getting results: ${error}`);
  }
};
