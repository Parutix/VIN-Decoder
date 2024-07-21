import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [vinData, setVinData] = useState({
    vin: "",
  });
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
        console.log("Response:", responseData);

        const result = responseData?.Response?.Results[0]?.DecodedVINValues[0];

        const carInfoData = {
          manufacturer: result?.Manufacturer[0] || "N/A",
          make: result?.Make[0] || "N/A",
          model: result?.Model[0] || "N/A",
          year: result?.ModelYear[0] || "N/A",
          bodyClass: result?.BodyClass[0] || "N/A",
          engineCylinders: result?.EngineCylinders[0] || "N/A",
          fuelTypePrimary: result?.FuelTypePrimary[0] || "N/A",
          turbo: result?.Turbo[0] || "N/A",
          trim: result?.Trim[0] || "N/A",
        };

        setCarInfo(carInfoData);
        setIsSubmitted(true);
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
