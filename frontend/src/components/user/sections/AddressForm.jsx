import React, { useState, useEffect } from "react";

const AddressForm = ({ onSave, onCancel, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    type: "Home",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-green-800">{initialData ? "Edit Address" : "Add New Address"}</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 mb-2 w-full" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit phone number" className="border p-2 mb-2 w-full" />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 mb-2 w-full"></textarea>

      <select name="type" value={form.type} onChange={handleChange} className="border p-2 mb-4 w-full">
        <option>Home</option>
        <option>Work</option>
        <option>Farm</option>
      </select>

      <div className="flex gap-2">
        <button onClick={handleSubmit} className="bg-green-700 text-white px-4 py-2 rounded">Save</button>
        <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default AddressForm;
