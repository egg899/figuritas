import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000", // 👈 IMPORTANTE
  baseURL: "https://album-figuritas-backend.onrender.com", // 👈 IMPORTANTE
});

export default api;