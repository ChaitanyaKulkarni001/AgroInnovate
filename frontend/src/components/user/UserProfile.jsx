import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from "../auth/AuthContext"

const UserProfile = () => {
  // Dummy user data (simulate fetched API response)
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobile: '+91 9876543210',
  };

  const {logout} = useAuth()
  const navigate = useNavigate()

  const onLogout = ()=>{
    logout()
    navigate('/')

  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
            {user.name[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <nav className="space-y-6">
          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">My Orders</h4>
            <NavLink to="orders" className="block text-gray-700 hover:text-blue-600">Orders</NavLink>
          </div>

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Account Settings</h4>
            <NavLink to="" className="block text-gray-700 hover:text-blue-600">Profile Information</NavLink>
            <NavLink to="addresses" className="block text-gray-700 hover:text-blue-600">Manage Addresses</NavLink>
            <NavLink to="pan" className="block text-gray-700 hover:text-blue-600">PAN Card Info</NavLink>
          </div>

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Payments</h4>
            <NavLink to="giftcards" className="block text-gray-700 hover:text-blue-600">Gift Cards</NavLink>
            <NavLink to="upi" className="block text-gray-700 hover:text-blue-600">Saved UPI</NavLink>
            <NavLink to="cards" className="block text-gray-700 hover:text-blue-600">Saved Cards</NavLink>
          </div>

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">My Stuff</h4>
            <NavLink to="coupons" className="block text-gray-700 hover:text-blue-600">My Coupons</NavLink>
            <NavLink to="reviews" className="block text-gray-700 hover:text-blue-600">Reviews & Ratings</NavLink>
            <NavLink to="notifications" className="block text-gray-700 hover:text-blue-600">Notifications</NavLink>
            <NavLink to="wishlist" className="block text-gray-700 hover:text-blue-600">Wishlist</NavLink>
          </div>

          <div>
            <button onClick={onLogout} className="mt-8 w-full text-left text-red-600 hover:underline">Logout</button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        {/* Nested content */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
