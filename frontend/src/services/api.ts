import axios from 'axios';

const api = axios.create({baseURL:'http://localhost:9088'});

export default api;
