import React, { useState } from 'react';
import { MapPin, Mail, Phone, Building } from 'lucide-react'; // Using icons for better UI

const BusinessInfo = () => {
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const businessData = {
            name: businessName,
            email: businessEmail,
            phone: businessPhone,
            address: businessAddress,
        };
        console.log('Business Info Submitted:', businessData);
        // Simulate successful submission
        setTimeout(() => {
            setIsSubmitted(true);
            setSubmissionMessage('Business information submitted successfully!');
            setBusinessName('');
            setBusinessEmail('');
            setBusinessPhone('');
            setBusinessAddress('');
        }, 1000);
        // In a real application, you would send this data to your backend
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Building className="h-5 w-5 text-indigo-500" />
                <span>Business Information</span>
            </h2>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">
                            Business Name:
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="businessName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="businessEmail" className="block text-gray-700 text-sm font-bold mb-2">
                            Business Email:
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                id="businessEmail"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="businessPhone" className="block text-gray-700 text-sm font-bold mb-2">
                            Business Phone:
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                id="businessPhone"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={businessPhone}
                                onChange={(e) => setBusinessPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="businessAddress" className="block text-gray-700 text-sm font-bold mb-2">
                            Business Address:
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                            <textarea
                                id="businessAddress"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={businessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                                required
                                rows="3" // Added rows for better visual
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{submissionMessage}</span>
                </div>
            )}
        </div>
    );
};

export default BusinessInfo;