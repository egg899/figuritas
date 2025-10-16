import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // 👈 IMPORTANTE
});

export default api;