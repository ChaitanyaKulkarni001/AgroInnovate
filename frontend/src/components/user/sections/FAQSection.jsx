import React, { useState } from "react";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via SMS or email. You can also check the 'Orders' section in your account.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, debit/credit cards, net banking, and cash on delivery (COD) in selected areas.",
  },
  {
    question: "How can I update my delivery address?",
    answer:
      "Go to the 'Addresses' section in your profile to add, edit, or remove saved addresses before placing an order.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, you can cancel the order from your 'Orders' page until it has been shipped.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 bg-green-100 hover:bg-green-200 font-medium flex justify-between items-center"
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
