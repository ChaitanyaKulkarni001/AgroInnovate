import React, { useState } from 'react';

const CurrentProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: '₹30/kg',
      quantity: '100 kg',
      status: 'Active',
      image: 'https://www.centralmarket.com/wp-content/uploads/2020/09/471240.jpg',
    },
    {
      id: 2,
      name: 'Organic Onions',
      price: '₹25/kg',
      quantity: '60 kg',
      status: 'Active',
      image: 'https://www.melissas.com/cdn/shop/products/organic-sweet-onions.jpg',
    },
    {
      id: 3,
      name: 'Wheat Grain',
      price: '₹18/kg',
      quantity: '200 kg',
      status: 'Inactive',
      image: 'https://www.istockphoto.com/photo/wheat-grain-gm157482029-21299916',
    },
  ]);
  
  const [isEditing, setIsEditing] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleEditClick = (product) => {
    setIsEditing(product.id);
    setEditedProduct({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create a local URL for the selected file
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        image: newImageUrl, // Update image with the new URL
      }));
    }
  };

  const handleSaveEdit = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Products on Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              {isEditing === product.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={editedProduct.quantity}
                    onChange={handleInputChange}
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />
                  
                  {/* Replace Image */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Replace Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2 px-3 py-2 border rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">Select an image to replace the current one.</p>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 text-black px-4 py-2 rounded-full text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-green-700 font-medium">{product.price}</p>
                  <p className="text-sm text-gray-600 mb-2">Quantity: {product.quantity}</p>
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                      product.status === 'Active'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {product.status}
                  </span>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">Remove</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentProducts;
