import React, { useState } from "react";
import ContactDetails from "./ContactDetails";
import PersonalDetails from "./PersonalDetails";
import FarmerSpecificDetails from "./FarmerSpecificDetails"; // Farmer role-specific page

const FarmerSetup = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track current page/step

  const handleContactDetailsSubmit = (data) => {
    console.log("Contact Details:", data);
    setCurrentStep(2); // Move to Personal Details
  };

  const handlePersonalDetailsSubmit = (data) => {
    console.log("Personal Details:", data);
    setCurrentStep(3); // Move to Farmer-specific page
  };

  const handleFarmerSpecificSubmit = (data) => {
    console.log("Farmer Specific Details:", data);
    // Handle submission logic here
  };

  return (
    <div>
      {currentStep === 1 && <ContactDetails onSubmit={handleContactDetailsSubmit} />}
      {currentStep === 2 && <PersonalDetails onSubmit={handlePersonalDetailsSubmit} />}
      {currentStep === 3 && <FarmerSpecificDetails onSubmit={handleFarmerSpecificSubmit} />}
    </div>
  );
};

export default FarmerSetup;
