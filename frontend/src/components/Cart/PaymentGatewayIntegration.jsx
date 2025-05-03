import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMoneyRupeeCircleLine, RiBankCardLine, RiQrScan2Line } from "react-icons/ri";

const methods = {
  upi: {
    label: "UPI (Google Pay, PhonePe, Paytm)",
    icon: <RiQrScan2Line className="text-xl text-green-700" />,
  },
  card: {
    label: "Credit / Debit Card",
    icon: <RiBankCardLine className="text-xl text-green-700" />,
  },
  cod: {
    label: "Cash on Delivery",
    icon: <RiMoneyRupeeCircleLine className="text-xl text-green-700" />,
  },
};

const PaymentGatewayIntegration = ({ amount }) => {
  const [selected, setSelected] = useState("upi");

  const handlePay = () => {
    alert(`✅ Payment Method: ${selected.toUpperCase()}\n💰 Amount: ₹${amount}\n(This is a simulated payment)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h4 className="text-xl font-semibold text-green-800">Select Payment Option</h4>
      <div className="space-y-4">
        {Object.entries(methods).map(([key, { label, icon }]) => (
          <label
            key={key}
            className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
              selected === key
                ? "border-green-700 bg-green-50 shadow"
                : "border-gray-300 hover:border-green-400"
            } cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span>{label}</span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={selected === key}
              onChange={() => setSelected(key)}
              className="accent-green-700"
            />
          </label>
        ))}
      </div>
      <button
        onClick={handlePay}
        className="w-full py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition font-semibold"
      >
        Pay ₹{amount}
      </button>
    </motion.div>
  );
};

export default PaymentGatewayIntegration;
