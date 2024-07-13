import { Request, Response } from "express";
import * as decoderService from "../services/decoderService";

export const decodeVIN = async (req: Request, res: Response) => {
  try {
    const vin = req.body.vin;
    console.log(vin);
    const decodedVIN = await decoderService.decodeVIN(vin);
    if (decodedVIN) {
      res.status(200).json(decodedVIN);
    } else {
      res.status(400).send("VIN decoding failed");
    }
  } catch (error) {
    res.status(400).send(`Error decoding VIN: ${error}`);
  }
};
