import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // uses proxy in dev; set full URL in production if needed
});

export default api;
