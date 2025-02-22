import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosFileInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "multipart/form-data", 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

axiosFileInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosFileInstance, axiosInstance };
