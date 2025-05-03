import React, { useState } from "react";
import ProgressBar from "../../ProgressBar";
import PersonalDetails from "../PersonalDetails"
import ContactDetails from "../ContactDetails"
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import FinalPreferences from "./FinalPreferences";
import { submitCustomerData } from '../../../../api' // Importing the API call function
import { useNavigate } from 'react-router-dom'; 

const CustomerSetup = () => {
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
    try {
      const response = await submitCustomerData(formData); // Calling API to submit data
      console.log("Success:", response);
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProgressBar step={step} totalSteps={5} />
      {step === 1 && <PersonalDetails onNext={handleNext} />}
      {step === 2 && <ContactDetails onNext={handleNext} onBack={handleBack}/>}
      {step === 3 && <AddressDetails onNext={handleNext} onBack={handleBack}/>}
      {step === 4 && <PaymentDetails onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <FinalPreferences onNext={handleNext} onBack={handleBack} />}
      
    </div>
  );
};

export default CustomerSetup;

CustomerSetup