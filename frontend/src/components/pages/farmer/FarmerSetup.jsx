import React, { useState } from "react";
import FarmerPage1 from "./FarmerPage1";
import FarmerPage2 from "./FarmerPage2";
import FarmerPage3 from "./FarmerPage3";
import FarmerPage4 from "./FarmerPage4";
import ProgressBar from "../../ProgressBar";
import PersonalDetails from "../PersonalDetails"
import ContactDetails from "../ContactDetails";
// Hook for navigation
import { submitFarmerData } from '../../../../api' // Importing the API call function
import { useNavigate } from 'react-router-dom'; 

const FarmerSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async() => {
    console.log("Final Submission:", formData);
    // try {
    //   const response = await submitFarmerData(formData); // Calling API to submit data
    //   console.log("Success:", response);
    //   navigate('/login'); // Redirect to login page after success
    // } catch (error) {
    //   console.error("Failed to submit:", error);
    // }
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProgressBar step={step} totalSteps={6} />

      {step === 1 && <PersonalDetails onNext={handleNext} />}
      {step === 2 && <ContactDetails onNext={handleNext} onBack={handleBack}/>}
      {step === 3 && <FarmerPage1 onNext={handleNext} onBack={handleBack}/>}
      {step === 4 && <FarmerPage2 onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <FarmerPage3 onNext={handleNext} onBack={handleBack} />}
      {step === 6 && (
        <FarmerPage4 data={formData} onSubmit={handleSubmit} onBack={handleBack} />
      )}
    </div>
  );
};

export default FarmerSetup;
