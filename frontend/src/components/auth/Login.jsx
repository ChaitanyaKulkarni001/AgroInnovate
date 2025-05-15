import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post(`api/token/`, { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || "Network error. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex min-h-screen bg-green-50">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?fm=jpg&q=60&w=3000"
            alt="Farm background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
              FarmKart Login
            </h2>
            <p className="text-center text-green-700 mb-6">
              Enter your credentials to continue
            </p>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-green-900">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-green-900">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition-shadow ${
                  loading ? 'bg-green-400' : 'bg-green-700 hover:bg-green-900'
                } text-white shadow-md`}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-green-700">
              Don&apos;t have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                className="text-green-900 font-semibold cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}