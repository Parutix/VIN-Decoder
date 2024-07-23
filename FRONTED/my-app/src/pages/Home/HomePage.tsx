import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const user_id = localStorage.getItem("user_id");
  const [vinData, setVinData] = useState({ vin: "" });
  const [carInfo, setCarInfo] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting VIN:", vinData.vin);

      const response = await fetch(
        `http://localhost:3000/api/decoder/decodeVIN?vin=${encodeURIComponent(
          vinData.vin
        )}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);

        const result = responseData?.Response?.Results[0]?.DecodedVINValues[0];
        console.log("Decoded VIN Result:", result);

        const carInfoData = {
          manufacturer:
            (result?.Manufacturer && result.Manufacturer[0]) || "N/A",
          make: (result?.Make && result.Make[0]) || "N/A",
          model: (result?.Model && result.Model[0]) || "N/A",
          year: (result?.ModelYear && result.ModelYear[0]) || "N/A",
          bodyClass: (result?.BodyClass && result.BodyClass[0]) || "N/A",
          engineCylinders:
            (result?.EngineCylinders && result.EngineCylinders[0]) || "N/A",
          fuelTypePrimary:
            (result?.FuelTypePrimary && result.FuelTypePrimary[0]) || "N/A",
          turbo: (result?.Turbo && result.Turbo[0]) || "N/A",
          trim: (result?.Trim && result.Trim[0]) || "N/A",
        };

        console.log("Car Info Data:", carInfoData);

        setCarInfo(carInfoData);
        setIsSubmitted(true);

        const resultsCount = Object.values(carInfoData).filter(
          (value) => value !== "N/A" && value !== "" && value !== undefined
        ).length;

        console.log("Results Count:", resultsCount);

        const createResultResponse = await fetch(
          "http://localhost:3000/api/results/createResult",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user_id,
              vin: vinData.vin,
              results_count: resultsCount,
              carInfo: carInfoData,
            }),
          }
        );

        if (!createResultResponse.ok) {
          console.error("Failed to save the result!");
        } else {
          console.log("Result saved successfully!");
        }
      } else {
        alert("Failed to get data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="home-page">
      <div className="home_container">
        {!isSubmitted ? (
          <>
            <input
              type="text"
              placeholder="VIN"
              name="vin"
              value={vinData.vin}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          carInfo && (
            <div className="car-info">
              <h2>Car Information</h2>
              <p>Manufacturer: {carInfo.manufacturer}</p>
              <p>Make: {carInfo.make}</p>
              <p>Model: {carInfo.model}</p>
              <p>Year: {carInfo.year}</p>
              <p>Body Class: {carInfo.bodyClass}</p>
              <p>Engine Cylinders: {carInfo.engineCylinders}</p>
              <p>Fuel Type: {carInfo.fuelTypePrimary}</p>
              <p>Turbo: {carInfo.turbo}</p>
              <p>Trim: {carInfo.trim}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
