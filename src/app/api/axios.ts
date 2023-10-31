import axios from 'axios';
import { API_HOST } from '../config/enviroments.ts';

export default axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
