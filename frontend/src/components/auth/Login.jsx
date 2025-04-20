import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic
    if (email && password) {
      navigate("/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Image Section */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D" // Replace with your own image if needed
          alt="Farming"
          className="w-full h-full object-cover"
        />
         <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white shadow-lg">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">Welcome Back</h2>
          <p className="text-center text-green-700 mb-8">Login to your FarmKart account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-green-900 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="example@farmkart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-green-900 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-900 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-green-700">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-900 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
