import axios from 'axios';
import StorageService from '../services/StorageService';

const ss = new StorageService();

let serverIp = '';
// serverIp = '172.26.127.26';
serverIp = '192.168.254.100';
const flaskURL = `http://${((serverIp !== '') ? serverIp : 'localhost')}:5000`;
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
