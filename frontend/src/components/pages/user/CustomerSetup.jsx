import React, { useState } from "react";
import ProgressBar from "../../ProgressBar";
import PersonalDetails from "../PersonalDetails"
import ContactDetails from "../ContactDetails"
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import FinalPreferences from "./FinalPreferences";

const CustomerSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Final Submission:", formData);
    // Submit to API logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProgressBar step={step} totalSteps={6} />

      {step === 1 && <PersonalDetails onNext={handleNext} />}
      {step === 2 && <ContactDetails onNext={handleNext} onBack={handleBack}/>}
      {step === 3 && <AddressDetails onNext={handleNext} onBack={handleBack}/>}
      {step === 4 && <PaymentDetails onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <FinalPreferences onNext={handleNext} onBack={handleBack} />}
      {step === 6 && (
        <FarmerPage4 data={formData} onSubmit={handleSubmit} onBack={handleBack} />
      )}
    </div>
  );
};

export default CustomerSetup;

CustomerSetup