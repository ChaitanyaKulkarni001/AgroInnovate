import React from "react";

const CartItem = ({ item, onRemove, onSelectChange, selected }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out">
      {/* Checkbox + Item Info */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelectChange(item.id)}
          className="w-5 h-5 accent-green-600"
        />
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-md object-cover"
        />
        <div>
          <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="text-right">
        <p className="font-bold text-green-800 text-lg">₹{item.price * item.quantity}</p>
        <button
          className="text-red-600 text-sm mt-2 hover:text-red-800 transition duration-300"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
