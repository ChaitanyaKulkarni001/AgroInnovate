import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Apple iPhone 14 (128 GB) - Midnight",
        price: 79999,
        oldPrice: 84999,
        rating: 4.5,
        reviews: 1890,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg"
      },
      {
        id: 2,
        name: "Samsung Galaxy M14 5G (6GB RAM, 128GB Storage)",
        price: 13999,
        oldPrice: 16999,
        rating: 4.2,
        reviews: 2230,
        image: "https://m.media-amazon.com/images/I/81ZSn2rk9WL._SL1500_.jpg"
      },
      {
        id: 3,
        name: "Noise ColorFit Pulse Grand Smart Watch",
        price: 1499,
        oldPrice: 3999,
        rating: 4.1,
        reviews: 5320,
        image: "https://m.media-amazon.com/images/I/61epn29QG0L._SL1500_.jpg"
      },
    ];
    setTimeout(() => setProducts(data), 300);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Deals of the Day</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 relative group">
            {/* Wishlist Icon */}
            <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500 z-10">
              <i className="far fa-heart text-xl"></i>
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain p-4"
            />

            <div className="px-4 pb-5">
              <h3 className="text-md font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>

              {/* Pricing */}
              <div className="flex items-center mt-2 space-x-2">
                <span className="text-lg font-bold text-green-700">₹{product.price.toLocaleString()}</span>
                <span className="line-through text-sm text-gray-500">₹{product.oldPrice.toLocaleString()}</span>
                <span className="text-sm text-red-500 font-semibold">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                </span>
              </div>

              {/* Ratings */}
              <div className="flex items-center text-yellow-500 mt-1 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star mr-1 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  ></i>
                ))}
                <span className="text-gray-600 ml-1 text-xs">({product.reviews}+)</span>
              </div>

              {/* Add to Cart */}
              <button className="mt-4 w-full py-2 bg-yellow-400 hover:bg-yellow-300 rounded text-sm font-medium transition duration-300">
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
