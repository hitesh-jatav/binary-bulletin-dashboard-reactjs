import axios from "axios";

// Load baseURL from environment variables
const baseURL = process.env.REACT_APP_API_BASE_URL + "/api";
console.log(baseURL)
// Unprotected Axios instance (No token required)
export const unprotectedAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Protected Axios instance (Token required)
export const protectedAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fileUploadProtectedAxios = axios.create({
  baseURL: baseURL,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});




fileUploadProtectedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Add a request interceptor to include the token from localStorage for protected requests
protectedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);