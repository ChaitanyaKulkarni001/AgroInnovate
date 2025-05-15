// src/components/Products.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userCity, setUserCity] = useState("Pandharpur");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // 1) Load consumer city
  useEffect(() => {
    async function fetchCity() {
      try {
        const { data } = await api.get("api/customers/me/");
        if (data.city?.name) {
          setUserCity(data.city.name);
        }
      } catch (err) {
        setUserCity("Pandharpur");
        console.error("Failed to fetch user city:", err);
      }
    }
    fetchCity();
  }, []);

  // 2) Load products & categories
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await api.get("api/products/");
        console.log("Products data:", data);
        const avail = data.filter(p => p.is_available);
        setProducts(avail);
        setCategories([...new Set(avail.map(p => p.category))]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  // 3) Apply all filters client-side
  useEffect(() => {
    const result = products.filter(p => {
      const price = parseFloat(p.discounted_price || p.original_price);
      // const matchCity = userCity
      //   ? p.farmer?.city?.name === userCity
      //   : true;
      const matchCity = userCity
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      const matchPrice = price >= minPrice && price <= maxPrice;
      return matchCity && matchSearch && matchCategory && matchPrice;
    });
    setFilteredProducts(result);
  }, [products, userCity, searchQuery, selectedCategory, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(100000);
  };

  if (loading) {
    return (
      <div className="flex bg-green-50 min-h-screen justify-center items-center">
        <div className="text-green-800 text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-green-50 min-h-screen justify-center items-center">
        <div className="text-red-600 text-xl">
          Error loading products: {error}
          <br />
          <small>Please check your backend server is running at http://127.0.0.1:8000</small>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-green-50 min-h-screen">
      <aside className="w-80 sticky top-0 h-screen bg-green-900/70 text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={clearFilters} className="text-red-400 hover:text-red-300">
            Clear
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-green-800 text-white"
        />

        <div className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            <span>Category</span>
            <span>{showCategory ? "▲" : "▼"}</span>
          </div>
          {showCategory && (
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full mt-2 px-2 py-1 rounded bg-green-800 text-white"
            >
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        <div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowPrice(!showPrice)}
          >
            <span>Price</span>
            <span>{showPrice ? "▲" : "▼"}</span>
          </div>
          {showPrice && (
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                className="w-1/2 px-2 py-1 rounded bg-green-800 text-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-1/2 px-2 py-1 rounded bg-green-800 text-white"
              />
            </div>
          )}
        </div>

        <p className="mt-6 text-sm">
          Showing only products where your city (<strong>{userCity || "…"}</strong>)
          matches the farmer’s city.
        </p>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {filteredProducts.length
            ? `Found ${filteredProducts.length} product${filteredProducts.length > 1 ? "s" : ""}`
            : "No products match your filters"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              {p.image1 && (
                <img
                  src={p.image1}
                  alt={p.name}
                  className="h-32 w-full object-cover rounded mb-3"
                />
              )}
              <h3 className="font-bold text-gray-800">{p.name}</h3>
              <p className="text-green-700 font-semibold">
                ₹{p.discounted_price || p.original_price}
              </p>
              <p className="text-sm text-gray-600">
                Farmer’s city: <strong>{p.farmer?.city?.name || "Unknown"}</strong>
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
