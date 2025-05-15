import React, { useState } from 'react';

const FeedbackAndSupport = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Feedback & Support</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="p-2 border rounded-md mb-4 w-full"
        rows="5"
        placeholder="Enter your feedback or issue..."
      ></textarea>
      <button
        onClick={handleSubmitFeedback}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg transition duration-300"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackAndSupport;
