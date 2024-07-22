import express from "express";
import * as resultController from "../controllers/resultController";
const resultRouter = express.Router();

resultRouter.get("/getResults", resultController.get_last_ten_results);
resultRouter.post("/createResult", resultController.createResult);

export default resultRouter;
