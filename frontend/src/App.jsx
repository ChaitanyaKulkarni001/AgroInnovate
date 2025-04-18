import React from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdOutlineAgriculture } from 'react-icons/md';

const categories = [
  'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Poultry', 'Meat', 'Herbs', 'Honey', 'Farm Tools', 'Machinery', 'Fertilizers', 'Seed', 'Handicrafts'
];

const products = [
  { name: 'Organic Carrots', image: 'https://via.placeholder.com/100' },
  { name: 'Fresh Milk', image: 'https://via.placeholder.com/100' },
  { name: 'Grain Pack', image: 'https://via.placeholder.com/100' },
  { name: 'Farm Chair', image: 'https://via.placeholder.com/100' },
  { name: 'Water Hose', image: 'https://via.placeholder.com/100' }
];

const App = () => {
  return (
    <div className="bg-green-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdOutlineAgriculture className="text-2xl" />
          <span className="text-xl font-bold">FarmKart</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-2 rounded text-black">
          <FaSearch />
          <input
            type="text"
            placeholder="Search for farm products"
            className="outline-none py-1 px-2 w-64"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:underline">Login</button>
          <FaUser className="text-xl" />
          <FaShoppingCart className="text-xl" />
        </div>
      </header>

      {/* Categories */}
      <div className="flex overflow-x-auto py-4 px-2 gap-4 bg-green-100">
        {categories.map((cat) => (
          <div key={cat} className="flex-shrink-0 text-center">
            <img
              src="https://via.placeholder.com/60"
              alt={cat}
              className="mx-auto rounded-full border border-green-400"
            />
            <p className="text-sm mt-1">{cat}</p>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="px-4 py-2">
        <div className="relative">
          <img
            src="https://via.placeholder.com/1200x300.png?text=Support+Local+Farmers"
            alt="Banner"
            className="rounded-lg w-full"
          />
        </div>
      </div>

      {/* Suggested Products */}
      <section className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
        <div className="flex gap-4 overflow-x-auto">
          {products.map((product, i) => (
            <div
              key={i}
              className="min-w-[150px] border p-2 rounded-lg bg-white shadow"
            >
              <img src={product.image} alt={product.name} className="h-24 mx-auto" />
              <p className="text-sm text-center mt-2">{product.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discount Products */}
      <section className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Discounts for You</h2>
          <button className="text-green-700 hover:underline">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {products.map((product, i) => (
            <div
              key={i}
              className="min-w-[150px] border p-2 rounded-lg bg-white shadow"
            >
              <img src={product.image} alt={product.name} className="h-24 mx-auto" />
              <p className="text-sm text-center mt-2">{product.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
