import axios from 'axios';
import { API_DASHBOARD_HOST } from '../config/enviroments';

export default axios.create({
  baseURL: API_DASHBOARD_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
