import express from "express";
import * as decoderController from "../controllers/decoderController";
const decodeRouter = express.Router();

decodeRouter.get("/decodeVIN", decoderController.decodeVIN);

export default decodeRouter;
