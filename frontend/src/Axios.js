// src/axios.js

import axios from 'axios';

// Set up the base URL to point to your backend API
const BASE_URL = 'http://127.0.0.1:8000/api/';  // Change this to your backend URL if needed

const axiosInstance = axios.create({
  baseURL: BASE_URL,  // base URL for API calls
  timeout: 10000,     // optional timeout for requests
});

export default axiosInstance;
