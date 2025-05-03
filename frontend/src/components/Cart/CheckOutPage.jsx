import React, { useState } from "react";
import CheckoutForm from "./CheckOutForm";
import PaymentGatewayIntegration from "./PaymentGatewayIntegration";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutPage = () => {
  const [formData, setFormData] = useState(null);
  const cartTotal = 450;
  const shipping = 50;
  const totalAmount = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-green-800">Checkout</h2>
          {!formData ? (
            <CheckoutForm onSubmit={setFormData} />
          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-3" />
              <p className="text-lg font-semibold text-green-700">Shipping Confirmed</p>
              <p className="text-sm text-gray-500">Continue to Payment</p>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="p-6 bg-white border rounded-2xl shadow-xl space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-green-900 mb-3">Order Summary</h3>
            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg text-green-800 mt-2">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
          {formData && <PaymentGatewayIntegration amount={totalAmount} />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
