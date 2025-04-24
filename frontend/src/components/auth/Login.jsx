import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();


  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/login/", {
  //       username: data.email,
  //       password: data.password,
  //     });

  //     // Save token to localStorage or context if needed
  //     localStorage.setItem("token", response.data.token);
  //     showSuccess("Login successful!");
  //     navigate("/"); // or navigate("/landing")
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       showError(error.response.data.detail || "Login failed");
  //     } else {
  //       showError("Something went wrong. Please try again.");
  //     }
  //   }
  // };

  const onSubmit = (data) => {
    const { email, password } = data;

    if (email === "user@mail.com" && password === "123") {
      login(); 
      navigate('/');
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials. Try user / 123");
      navigate('/login');
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="flex min-h-screen bg-green-50">
        {/* Image Section */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src="https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?fm=jpg&q=60&w=3000"
            alt="Farming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white shadow-lg">
          <div className="max-w-md w-full">
            <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
              Welcome Back
            </h2>
            <p className="text-center text-green-700 mb-8">
              Login to your FarmKart account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-green-900 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@farmkart.com"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-green-900 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
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
};

export default Login;
