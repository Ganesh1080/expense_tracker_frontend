import axios from "axios";

// API BASE
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ ADD TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ AUTO LOGOUT IF TOKEN EXPIRED
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
