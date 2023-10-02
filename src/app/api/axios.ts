import axios from "axios";

export default axios.create({
    baseURL: 'http://104.248.24.125:8000/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});