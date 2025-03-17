import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://taskmanagerbackend-ibu5.onrender.com/api',
  timeout: 10000,
  //   headers: {
  //     'Content-Type': 'application/json', 
  //   },
});

