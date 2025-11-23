import axios from 'axios';

// Set axios default baseURL from Vite env or fallback to localhost for dev
const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.baseURL = BASE;

export default axios;
