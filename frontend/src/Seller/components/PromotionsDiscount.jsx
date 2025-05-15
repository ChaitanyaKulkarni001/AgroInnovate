import React, { useState } from 'react';

const PromotionsAndDiscounts = () => {
  const [promotion, setPromotion] = useState('');
  const [promotionsList, setPromotionsList] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddPromotion = () => {
    if (promotion.trim() === '') {
      setError('Promotion code cannot be empty.');
      setSuccessMessage('');
      return;
    }

    // Add the promotion to the list
    setPromotionsList([...promotionsList, promotion]);

    // Show success message
    setSuccessMessage(`Promotion '${promotion}' added successfully!`);
    
    // Clear input field and error message
    setPromotion('');
    setError('');
  };

  const handleClearInput = () => {
    setPromotion('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Promotions & Discounts</h3>
      
      {/* Display success message */}
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      
      {/* Display error message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      {/* Input for adding promotion */}
      <input 
        type="text" 
        value={promotion} 
        onChange={(e) => setPromotion(e.target.value)} 
        className="p-2 border rounded-md mb-4 w-full" 
        placeholder="Enter discount code or promotion" 
      />
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleAddPromotion}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg transition duration-300"
        >
          Add Promotion
        </button>
        <button
          onClick={handleClearInput}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-lg transition duration-300"
        >
          Clear
        </button>
      </div>

      {/* Display List of Added Promotions */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800">Active Promotions</h4>
        <ul className="mt-4">
          {promotionsList.map((promo, index) => (
            <li key={index} className="py-2 text-gray-700">
              {promo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromotionsAndDiscounts;
