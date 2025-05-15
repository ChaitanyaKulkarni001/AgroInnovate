import React, { useState } from "react";
import CartItem from "./CartItem";
import PriceSummary from "./PriceSummary";
import ApplyCoupon from "./ApplyCoupon";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const dummyCart = [
  { id: 1, name: "Organic Seeds", image: "/seed.jpg", price: 150, quantity: 2 },
  { id: 2, name: "Fertilizer Pack", image: "/fertilizer.jpg", price: 300, quantity: 1 },
];

const CartPage = () => {
  const [items, setItems] = useState(dummyCart);
  const [selectedItems, setSelectedItems] = useState(dummyCart.map(item => item.id));
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedProducts = items.filter(item => selectedItems.includes(item.id));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-8 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaShoppingCart className="text-green-700 text-3xl" />
          <h2 className="text-4xl font-bold text-green-800">Your Cart</h2>
        </div>

        {items.length === 0 ? (
          <motion.p className="text-gray-500 text-lg">Your cart is empty.</motion.p>
        ) : (
          <motion.div className="space-y-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                selected={selectedItems.includes(item.id)}
                onSelectChange={toggleSelect}
                onRemove={handleRemove}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-white shadow-md p-6 border border-green-100"
            >
              <PriceSummary items={selectedProducts} />
              <ApplyCoupon onApply={(code) => alert(`Applied coupon: ${code}`)} />
              <button
                className="w-full mt-6 bg-green-700 text-white py-3 text-lg rounded-xl hover:bg-green-900 transition"
                onClick={() => navigate("/checkout", { state: { items: selectedProducts } })}
                disabled={selectedProducts.length === 0}
              >
                Proceed to Checkout ({selectedProducts.length} items)
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
