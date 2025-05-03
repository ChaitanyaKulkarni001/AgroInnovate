import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { products as allProducts, categories } from "../../data/Farmdata";
 
import { ChevronDown, ChevronUp, X, TreeDeciduous, Sprout } from "lucide-react";

const Products = () => {
  const { state } = useLocation();
  const { category: initialCategory } = state || {};

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // Always filter from the full products list
  const products = allProducts;

  const knownCategories = categories.map(c => c.name);

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = price >= minPrice && price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setMinPrice(0);
    setMaxPrice(100000);
  };

  return (
    <div className="flex bg-green-50 min-h-screen">
      <aside className="w-80 sticky top-0 h-screen bg-[url('/images/farm-forest-pattern.png')] bg-cover bg-blend-overlay bg-green-900/70 text-white p-6 shadow-2xl rounded-r-2xl border-r border-green-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
            <Sprout size={20} className="text-green-300" />
            Farm Filters
          </h2>
          <button onClick={clearFilters} className="text-sm text-red-400 flex items-center gap-1 hover:text-red-300">
            <X size={16} /> Clear
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-green-800 border border-green-600 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Search crops, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setShowCategory(!showCategory)}>
            <h3 className="text-sm font-semibold flex items-center gap-1">
              <TreeDeciduous size={16} /> Category
            </h3>
            {showCategory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {showCategory && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded bg-green-800 border border-green-600 text-white focus:outline-none"
            >
              <option value="">All Categories</option>
              {knownCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setShowPrice(!showPrice)}>
            <h3 className="text-sm font-semibold text-green-300">💰 Price</h3>
            {showPrice ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {showPrice && (
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 px-2 py-1 rounded bg-green-800 border border-green-600 text-white placeholder-green-300"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 px-2 py-1 rounded bg-green-800 border border-green-600 text-white placeholder-green-300"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Link
                to={`/product/${encodeURIComponent(product.name)}`}
                state={{ product }}
                key={idx}
                className="bg-white p-4 shadow-lg rounded-xl hover:shadow-2xl transition block"
              >
                <img src={product.images[0]} alt={product.name} className="h-32 w-full object-cover mb-3 rounded" />
                <h4 className="font-bold text-gray-800">{product.name}</h4>
                <p className="text-green-700">{product.price}</p>
                <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
                  View
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-green-800">No products found</p>
        )}
      </main>
    </div>
  );
};

export default Products;