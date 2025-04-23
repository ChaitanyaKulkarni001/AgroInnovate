import React, { useState } from "react";

const ApplyCoupon = ({ onApply }) => {
  const [coupon, setCoupon] = useState("");

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter Coupon Code"
        className="px-4 py-2 border rounded w-full mb-2"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
        onClick={() => onApply(coupon)}
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default ApplyCoupon;
