import axios from 'axios';
import StorageService from '../services/StorageService';

const ss = new StorageService();

// const serverIp = '172.23.249.243'; 
const serverIp = '192.168.254.192';
// const serverIp = '192.168.1.4';
// const serverIp = '192.168.1.13';
// const flaskURL = `http://${((serverIp !== '') ? serverIp : 'localhost')}:5000`;
const flaskURL = `http://localhost:5000`;
const squareApiBaseUrl = flaskURL;

const square_api = axios.create({
    baseURL: squareApiBaseUrl,
});


square_api.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

square_api.interceptors.response.use(
    response => response,
    async error => {
        return Promise.reject(error);
    }
);

export default square_api;
export { squareApiBaseUrl as faceApiBaseUrl, serverIp };
