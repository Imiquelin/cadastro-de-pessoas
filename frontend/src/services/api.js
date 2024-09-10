import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do seu backend
});

export const testConnection = () => {
  return api.get('/api/test');
};

export default api;