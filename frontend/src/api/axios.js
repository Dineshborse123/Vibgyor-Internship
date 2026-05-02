import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vibgyor-internship.onrender.com/api',
});

// Attach token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
