import { Request, Response } from "express";
import { parseStringPromise } from "xml2js";

export const decodeVIN = async (vin: string) => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}`
    );
    const xmlData = await response.text();
    const jsonData = await parseStringPromise(xmlData);
    return jsonData;
  } catch (error) {
    console.error("Error decoding VIN in Service:", error);
    return null;
  }
};
