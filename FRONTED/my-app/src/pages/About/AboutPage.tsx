import "./AboutPage.css";
import React from "react";

const AboutPage = () => {
  return (
    <div className="about_container">
      <br></br>
      <h1>About</h1>
      <p>
        Welcome to VIN Decoder, your go-to app for uncovering detailed
        information about any vehicle with just its Vehicle Identification
        Number (VIN). Whether you're a car enthusiast, a potential buyer, or
        simply curious about a vehicle's history and specifications, our app
        provides quick and accurate insights.
      </p>
      <h1>What is a VIN?</h1>
      <p>
        A Vehicle Identification Number (VIN) is a unique code assigned to every
        motor vehicle when it's manufactured. This 17-character string of
        letters and numbers serves as a fingerprint for the vehicle, containing
        crucial information about its make, model, year of manufacture, engine
        type, and much more.
      </p>
      <h1>Features of VIN Decoder</h1>
      <p>
        <b>Detailed Vehicle Information:</b> Instantly access comprehensive
        details about the vehicle's manufacturer, make, model, year, body class,
        engine type, fuel type, and more.
      </p>
      <p>
        <b>User-Friendly Interface:</b> Our simple and intuitive design ensures
        that you can easily input a VIN and get the information you need without
        any hassle.
      </p>
      <p>
        <b>Convenient and Fast:</b> Get vehicle details within seconds. Our app
        is designed to provide quick results to save you time and effort.
      </p>
      <h1>How to Use</h1>
      <p>
        <b>Enter the VIN:</b> Simply type the 17-character VIN into the input
        field.
      </p>
      <p>
        <b>Submit:</b> Click the submit button to decode the VIN.
      </p>
      <p>
        <b>View Results:</b> Instantly view detailed information about the
        vehicle.
      </p>
      <h1>Why Use VIN Decoder?</h1>
      <p>
        Knowing the details about a vehicle can be incredibly beneficial,
        whether you're buying a used car, verifying vehicle information, or just
        satisfying your curiosity. VIN Decoder helps you make informed decisions
        by providing all the necessary details at your fingertips.
      </p>
      <p>
        _______________________________________________________________________________________________________________________________________
      </p>
    </div>
  );
};

export default AboutPage;
