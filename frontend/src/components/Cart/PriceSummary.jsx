import React from "react";

const PriceSummary = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50; // Static shipping cost
  const discount = 0; // Placeholder for any discounts
  const finalTotal = total + shipping - discount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-green-800 mb-4">Price Summary</h3>

      <div className="space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold text-gray-800">₹{total}</span>
        </div>
        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-gray-700">Shipping</span>
          <span className="font-semibold text-gray-800">₹{shipping}</span>
        </div>
        {/* Discount */}
        <div className="flex justify-between">
          <span className="text-gray-700">Discount</span>
          <span className="font-semibold text-green-600">₹{discount}</span>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        {/* Total */}
        <div className="flex justify-between">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold text-green-800">₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
