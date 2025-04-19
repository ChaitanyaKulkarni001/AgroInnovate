 // Products.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { products as allProducts } from "./data/Farmdata";

const Products = () => {
  const { state } = useLocation();
  const { category: initialCategory, products: passedProducts } = state || {};
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const products = passedProducts || allProducts;
  const knownCategories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = price >= minPrice && price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="bg-green-50 min-h-screen px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
        {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <input
          type="text"
          className="px-4 py-2 border rounded w-full"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="">All Categories</option>
          {knownCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            className="px-2 py-2 border rounded w-1/2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="px-2 py-2 border rounded w-1/2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <Link
              to={`/product/${encodeURIComponent(product.name)}`}
              state={{ product }}
              key={idx}
              className="bg-white p-4 shadow rounded-lg hover:shadow-xl transition block"
            >
              <div className="h-32 bg-gray-100 mb-3 rounded"></div>
              <h4 className="font-bold text-gray-800">{product.name}</h4>
              <p className="text-green-700">{product.price}</p>
              <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
                View Details
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-green-800">No products found</p>
      )}
    </div>
  );
};

export default Products;
