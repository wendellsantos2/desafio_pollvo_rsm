import axios from 'axios';

const baseURL = (window as any).VITE_API_URL || 'https://localhost:7000/api';

export const http = axios.create({
  baseURL,
});
