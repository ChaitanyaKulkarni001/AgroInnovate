import React, { useState } from 'react';
import { FaRupeeSign, FaUniversity, FaWallet, FaInfoCircle, FaCheckCircle } from 'react-icons/fa'; // Importing Font Awesome icons from react-icons

const BankDetails = () => {
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [upiId, setUpiId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const bankData = {
            bankName,
            accountHolderName,
            accountNumber,
            ifscCode,
            upiId,
        };
        console.log('Bank Details Submitted:', bankData);
        // Simulate successful submission
        setTimeout(() => {
            setIsSubmitted(true);
            setSubmissionMessage('Bank details saved successfully!');
            setBankName('');
            setAccountHolderName('');
            setAccountNumber('');
            setIfscCode('');
            setUpiId('');
        }, 1000);
        // In a real application, you would send this data to your backend
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                <FaUniversity className="h-5 w-5 text-green-500" /> {/* Bank Icon */}
                <span>Bank Account Details</span>
            </h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="bankName" className="block text-gray-700 text-sm font-bold mb-2">
                            Bank Name:
                        </label>
                        <div className="relative">
                            <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Bank Icon */}
                            <input
                                type="text"
                                id="bankName"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="accountHolderName" className="block text-gray-700 text-sm font-bold mb-2">
                            Account Holder Name:
                        </label>
                        <div className="relative">
                            <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Info Icon */}
                            <input
                                type="text"
                                id="accountHolderName"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={accountHolderName}
                                onChange={(e) => setAccountHolderName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="accountNumber" className="block text-gray-700 text-sm font-bold mb-2">
                            Account Number:
                        </label>
                        <div className="relative">
                            <FaWallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Wallet Icon */}
                            <input
                                type="text"
                                id="accountNumber"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ifscCode" className="block text-gray-700 text-sm font-bold mb-2">
                            IFSC Code:
                        </label>
                        <div className="relative">
                            <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                id="ifscCode"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline uppercase"
                                value={ifscCode}
                                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="upiId" className="block text-gray-700 text-sm font-bold mb-2">
                            UPI ID (Optional):
                        </label>
                        <div className="relative">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/UPI-Logo.svg/800px-UPI-Logo.svg.png" alt="UPI Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="upiId"
                                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save Details
                    </button>
                </form>
            ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{submissionMessage}</span>
                    <FaCheckCircle className="absolute top-1/2 right-2 transform -translate-y-1/2 h-6 w-6 text-green-500" /> {/* Check Circle Icon */}
                </div>
            )}
        </div>
    );
};

export default BankDetails;