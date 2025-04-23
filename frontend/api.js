import axiosInstance from "./src/Axios";

// API call to submit customer registration data
export const submitCustomerData = async (data) => {
  try {
    const response = await axiosInstance.post("/register/", data); // Adjust endpoint as per your Django backend
    return response.data;
  } catch (error) {
    console.error("Error submitting customer data:", error);
    throw error;
  }
};
export const submitFarmerData = async (data) => {
  try {
    const response = await axiosInstance.post("/register/", data); // Adjust endpoint as per your Django backend
    return response.data;
  } catch (error) {
    console.error("Error submitting customer data:", error);
    throw error;
  }
};