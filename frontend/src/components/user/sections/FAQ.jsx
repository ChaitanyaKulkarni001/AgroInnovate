import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "You can browse products, add them to your cart, and proceed to checkout by logging in and following the instructions."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI, debit/credit cards, and net banking. COD is available in selected areas."
  },
  {
    question: "How can I track my order?",
    answer: "Go to your profile, then navigate to 'Order History'. There, you can see live tracking of each placed order."
  },
  {
    question: "Can I cancel or modify an order?",
    answer: "Yes, orders can be modified or canceled from the 'Order History' page within 2 hours of placement."
  },
  {
    question: "What is the return policy?",
    answer: "We offer a 7-day return window on eligible products. Please refer to the return policy in the product description."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Frequently Asked Questions</h2>

      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border rounded-lg shadow-md bg-white">
          <button
            className="w-full text-left px-4 py-3 text-lg font-medium text-green-700 hover:bg-green-50 focus:outline-none"
            onClick={() => toggle(index)}
          >
            {faq.question}
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 text-gray-700 border-t bg-green-50">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
