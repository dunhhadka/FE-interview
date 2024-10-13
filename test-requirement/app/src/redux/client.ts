import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

client.interceptors.response.use(
  (response) => response, 
  (error) => {
    const { response } = error; 
    if (response && response.status === 401) {
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default client;
