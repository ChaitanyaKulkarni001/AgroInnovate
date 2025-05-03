 // src/data/Farmdata.js
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
    // Vegetables
    { name: "Organic Tomato", price: "₹60/kg", category: "Vegetables", rating: 4.5, stock: 150, description: "Fresh, organic tomatoes grown without pesticides.", specifications: [{ label: "Type", value: "Heirloom" }], images: ["https://images.pexels.com/photos/1632269/pexels-photo-1632269.jpeg"] },
    { name: "Green Capsicum", price: "₹80/kg", category: "Vegetables", rating: 4.2, stock: 100, description: "Crisp and fresh capsicums perfect for stir-fries.", specifications: [{ label: "Color", value: "Green" }], images: ["https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg"] },
    
    // Fruits
    { name: "Apple", price: "₹150/kg", category: "Fruits", rating: 4.2, stock: 50, description: "Sweet and crisp Red Delicious apples.", specifications: [{ label: "Type", value: "Red Delicious" }], images: ["https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg"] },
    { name: "Banana", price: "₹50/dozen", category: "Fruits", rating: 4.6, stock: 120, description: "Ripe bananas full of potassium.", specifications: [{ label: "Length", value: "6 inch avg" }], images: ["https://images.pexels.com/photos/1111310/pexels-photo-1111310.jpeg"] },
  
    // Grains
    { name: "Basmati Rice", price: "₹90/kg", category: "Grains", rating: 4.8, stock: 200, description: "Long-grain aromatic rice.", specifications: [{ label: "Origin", value: "India" }], images: ["https://images.pexels.com/photos/1615743/pexels-photo-1615743.jpeg"] },
    { name: "Wheat Flour", price: "₹40/kg", category: "Grains", rating: 4.3, stock: 180, description: "Whole wheat atta for rotis.", specifications: [{ label: "Protein", value: "12%" }], images: ["https://images.pexels.com/photos/36759/food-healthy-baking-flour-36759.jpeg"] },
  
    // Dairy
    { name: "Fresh Milk", price: "₹45/L", category: "Dairy", rating: 4.7, stock: 300, description: "Farm-fresh milk rich in calcium.", specifications: [{ label: "Fat Content", value: "4.5%" }], images: ["https://images.pexels.com/photos/1393883/pexels-photo-1393883.jpeg"] },
    { name: "Paneer", price: "₹200/kg", category: "Dairy", rating: 4.5, stock: 80, description: "Soft cottage cheese.", specifications: [{ label: "Moisture", value: "60%" }], images: ["https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"] },
  
    // Poultry
    { name: "Farm Eggs", price: "₹120/dozen", category: "Poultry", rating: 4.4, stock: 150, description: "Organic free-range eggs.", specifications: [{ label: "Size", value: "Large" }], images: ["https://images.pexels.com/photos/1661670/pexels-photo-1661670.jpeg"] },
    { name: "Chicken Breast", price: "₹250/kg", category: "Poultry", rating: 4.6, stock: 60, description: "Fresh boneless chicken breast.", specifications: [{ label: "Cut Type", value: "Boneless" }], images: ["https://images.pexels.com/photos/6506587/pexels-photo-6506587.jpeg"] },
  
    // Meat
    { name: "Mutton Chops", price: "₹400/kg", category: "Meat", rating: 4.3, stock: 40, description: "Tender mutton chops.", specifications: [{ label: "Cut", value: "Chops" }], images: ["https://images.pexels.com/photos/236781/pexels-photo-236781.jpeg"] },
    { name: "Beef Steak", price: "₹500/kg", category: "Meat", rating: 4.7, stock: 30, description: "Premium beef steak.", specifications: [{ label: "Grade", value: "A" }], images: ["https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg"] },
  
    // Herbs
    { name: "Coriander Leaves", price: "₹20/bunch", category: "Herbs", rating: 4.8, stock: 100, description: "Fresh coriander for seasoning.", specifications: [{ label: "Type", value: "Cilantro" }], images: ["https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"] },
    { name: "Mint Leaves", price: "₹15/bunch", category: "Herbs", rating: 4.9, stock: 90, description: "Refreshing mint leaves.", specifications: [{ label: "Aroma", value: "Strong" }], images: ["https://images.pexels.com/photos/132794/pexels-photo-132794.jpeg"] },
  
    // Honey
    { name: "Wild Honey", price: "₹300/250g", category: "Honey", rating: 4.6, stock: 70, description: "Raw wild forest honey.", specifications: [{ label: "Source", value: "Wild" }], images: ["https://images.pexels.com/photos/4659983/pexels-photo-4659983.jpeg"] },
    { name: "Organic Honey", price: "₹350/250g", category: "Honey", rating: 4.8, stock: 50, description: "Certified organic honey.", specifications: [{ label: "Certification", value: "USDA Organic" }], images: ["https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg"] },
  
    // Farm Tools
    { name: "Hand Trowel", price: "₹150", category: "Farm Tools", rating: 4.2, stock: 40, description: "Durable steel hand trowel.", specifications: [{ label: "Material", value: "Steel" }], images: ["https://images.pexels.com/photos/5843071/pexels-photo-5843071.jpeg"] },
    { name: "Pruning Shears", price: "₹250", category: "Farm Tools", rating: 4.5, stock: 30, description: "Sharp pruning shears for gardening.", specifications: [{ label: "Blade", value: "Carbon Steel" }], images: ["https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg"] },
  
    // Machinery
    { name: "Mini Tractor", price: "₹250000", category: "Machinery", rating: 4.1, stock: 5, description: "Compact mini tractor for small farms.", specifications: [{ label: "Horsepower", value: "25 HP" }], images: ["https://images.pexels.com/photos/7193983/pexels-photo-7193983.jpeg"] },
    { name: "Water Pump", price: "₹5000", category: "Machinery", rating: 4.3, stock: 15, description: "Electric water pump for irrigation.", specifications: [{ label: "Power", value: "1 HP" }], images: ["https://images.pexels.com/photos/6770048/pexels-photo-6770048.jpeg"] },
  
    // Fertilizers
    { name: "Farm Fertilizer", price: "₹500", category: "Fertilizers", rating: 4.3, stock: 100, description: "Organic crop fertilizer.", specifications: [{ label: "Weight", value: "10kg" }], images: ["https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg"] },
    { name: "NPK 20-20-20", price: "₹600", category: "Fertilizers", rating: 4.5, stock: 80, description: "Balanced NPK fertilizer.", specifications: [{ label: "Ratio", value: "20-20-20" }], images: ["https://images.pexels.com/photos/4162688/pexels-photo-4162688.jpeg"] },
  
    // Seed
    { name: "Wheat Seeds", price: "₹200/kg", category: "Seed", rating: 4.4, stock: 120, description: "High-yield wheat seeds.", specifications: [{ label: "Variety", value: "HD-2967" }], images: ["https://images.pexels.com/photos/694742/pexels-photo-694742.jpeg"] },
    { name: "Corn Seeds", price: "₹180/kg", category: "Seed", rating: 4.5, stock: 100, description: "Hybrid corn seeds.", specifications: [{ label: "Type", value: "Hybrid" }], images: ["https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg"] },
  
    // Handicrafts
    { name: "Bamboo Basket", price: "₹300", category: "Handicrafts", rating: 4.7, stock: 25, description: "Handwoven bamboo basket.", specifications: [{ label: "Material", value: "Bamboo" }], images: ["https://images.pexels.com/photos/160338/pexels-photo-160338.jpeg"] },
    { name: "Clay Pot", price: "₹150", category: "Handicrafts", rating: 4.6, stock: 30, description: "Traditional clay pot.", specifications: [{ label: "Capacity", value: "1L" }], images: ["https://images.pexels.com/photos/450271/pexels-photo-450271.jpeg"] },
  ];