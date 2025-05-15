import React from "react";
import {
  FaUserAlt,
  FaMapMarkedAlt,
  FaTractor,
  FaCreditCard,
  FaGift,
  FaHeart,
  FaStar,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ active, setActive }) => {
  const menuSections = [
    {
      title: "MY ACTIVITY",
      items: [
        { key: "orders", label: "My Orders", icon: <FaTractor /> },
      ],
    },
    {
      title: "PROFILE SETTINGS",
      items: [
        { key: "profile", label: "Farmer Info", icon: <FaUserAlt /> },
        { key: "address", label: "Farm Address", icon: <FaMapMarkedAlt /> },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        { key: "payments", label: "Saved UPI & Cards", icon: <FaCreditCard /> },
      ],
    },
    {
      title: "MY TOOLS",
      items: [
        { key: "coupons", label: "My Coupons", icon: <FaGift /> },
        { key: "wishlist", label: "Saved Items", icon: <FaHeart /> },
        { key: "reviews", label: "My Ratings", icon: <FaStar /> },
        { key: "notifications", label: "Alerts & Updates", icon: <FaBell /> },
      ],
    },
    {
      title: "HELP & SUPPORT",
      items: [
        { key: "faq", label: "FAQs", icon: <FaQuestionCircle /> },
        { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {menuSections.map((section, i) => (
        <div key={i}>
          <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">{section.title}</h4>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li
                key={item.key}
                className={`flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md transition ${
                  active === item.key
                    ? "bg-green-100 text-green-800 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActive(item.key)}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
