import React, { useState } from "react";

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold text-green-800">Shipping Address</h3>
      <input name="name" required placeholder="Full Name" className="w-full p-2 border rounded" onChange={handleChange} />
      <input name="address" required placeholder="Address" className="w-full p-2 border rounded" onChange={handleChange} />
      <input name="phone" required placeholder="Phone Number" className="w-full p-2 border rounded" onChange={handleChange} />
      <input name="pincode" required placeholder="Pincode" className="w-full p-2 border rounded" onChange={handleChange} />
      <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">Continue to Payment</button>
    </form>
  );
};

export default CheckoutForm;
