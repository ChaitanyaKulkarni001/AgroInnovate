export const categories = [
    { name: "Vegetables", image: "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg" },
    { name: "Fruits", image: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg" },
    { name: "Grains", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
    { name: "Dairy", image: "https://images.pexels.com/photos/573276/pexels-photo-573276.jpeg" },
    { name: "Poultry", image: "https://images.pexels.com/photos/1907229/pexels-photo-1907229.jpeg" },
    { name: "Meat", image: "https://images.pexels.com/photos/5217887/pexels-photo-5217887.jpeg" },
    { name: "Herbs", image: "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg" },
    { name: "Honey", image: "https://images.pexels.com/photos/4659983/pexels-photo-4659983.jpeg" },
    { name: "Farm Tools", image: "https://images.pexels.com/photos/5843071/pexels-photo-5843071.jpeg" },
    { name: "Machinery", image: "https://images.pexels.com/photos/7193983/pexels-photo-7193983.jpeg" },
    { name: "Fertilizers", image: "https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg" },
    { name: "Seed", image: "https://images.pexels.com/photos/694742/pexels-photo-694742.jpeg" },
    { name: "Handicrafts", image: "https://images.pexels.com/photos/160338/pexels-photo-160338.jpeg" },
];

export const products = [
    { 
        name: "Organic Tomato", 
        price: "₹60/kg", 
        category: "Vegetables", 
        rating: 4.5, 
        stock: 150, 
        description: "Fresh, organic tomatoes grown without pesticides. Perfect for salads and cooking.", 
        specifications: [
            { label: "Type", value: "Heirloom" },
            { label: "Weight", value: "500g" },
            { label: "Color", value: "Red" },
            { label: "Organic", value: "Yes" },
        ],
        images: [
            "https://images.pexels.com/photos/1632269/pexels-photo-1632269.jpeg",
            "https://images.pexels.com/photos/1721518/pexels-photo-1721518.jpeg"
        ]
    },
    { 
        name: "Basmati Rice", 
        price: "₹90/kg", 
        category: "Grains", 
        rating: 4.8, 
        stock: 200, 
        description: "Premium quality Basmati rice, perfect for biryanis, pilafs, and daily meals.", 
        specifications: [
            { label: "Brand", value: "Shree Ganesh" },
            { label: "Weight", value: "1kg" },
            { label: "Grain Type", value: "Long Grain" },
            { label: "Origin", value: "India" },
        ],
        images: [
            "https://images.pexels.com/photos/1615743/pexels-photo-1615743.jpeg",
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        ]
    },
    { 
        name: "Apple", 
        price: "₹150/kg", 
        category: "Fruits", 
        rating: 4.2, 
        stock: 50, 
        description: "Fresh apples harvested from the best orchards, sweet and crisp for your health.", 
        specifications: [
            { label: "Type", value: "Red Delicious" },
            { label: "Weight", value: "1kg" },
            { label: "Color", value: "Red" },
            { label: "Organic", value: "Yes" },
        ],
        images: [
            "https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg",
            "https://images.pexels.com/photos/1300569/pexels-photo-1300569.jpeg"
        ]
    },
    { 
        name: "Fresh Milk", 
        price: "₹45/L", 
        category: "Dairy", 
        rating: 4.7, 
        stock: 300, 
        description: "Freshly sourced milk from healthy cows, rich in protein and calcium.", 
        specifications: [
            { label: "Brand", value: "Amul" },
            { label: "Quantity", value: "1L" },
            { label: "Packaging", value: "Plastic Bottle" },
            { label: "Fat Content", value: "4.5%" },
        ],
        images: [
            "https://images.pexels.com/photos/1393883/pexels-photo-1393883.jpeg",
            "https://images.pexels.com/photos/1610510/pexels-photo-1610510.jpeg"
        ]
    },
    { 
        name: "Farm Fertilizer", 
        price: "₹500", 
        category: "Fertilizers", 
        rating: 4.3, 
        stock: 100, 
        description: "High-quality farm fertilizer, suitable for all types of crops and plants.", 
        specifications: [
            { label: "Brand", value: "GreenGrow" },
            { label: "Weight", value: "10kg" },
            { label: "Type", value: "Organic" },
            { label: "Usage", value: "Crop Growth" },
        ],
        images: [
            "https://images.pexels.com/photos/5843071/pexels-photo-5843071.jpeg",
            "https://images.pexels.com/photos/4126477/pexels-photo-4126477.jpeg"
        ]
    },
    // Add more products as needed
];
