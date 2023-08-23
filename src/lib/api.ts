import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    // baseURL: 'http://172.20.2.181:3000/api',
})