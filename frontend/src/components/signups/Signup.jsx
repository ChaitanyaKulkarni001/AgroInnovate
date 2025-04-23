import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../Axios";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/register", data);
      toast.success("Signup successful!");
      if (data.role === "Farmer") {
        navigate("/farmer-setup");
      } else if (data.role === "Customer") {
        navigate("/customer-setup");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-green-900 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-green-900 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="example@farmkart.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-green-900 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
              {...register("password", { required: "Password is required", minLength: 6 })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="text-green-900 block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Role Selector */}
          <div>
            <label htmlFor="role" className="text-green-900 block mb-1">
              Select Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("role", { required: "Please select a role" })}
            >
              <option value="">-- Choose a Role --</option>
              <option value="Farmer">Farmer</option>
              <option value="Customer">Customer</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept terms and conditions" })}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-green-800 text-sm">
              I agree to the <span className="underline">Terms & Conditions</span>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-900 text-white py-3 rounded-md font-semibold transition"
          >
            Sign Up
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-green-700 mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-900 font-semibold cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
