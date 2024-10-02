import axios from "axios";
import { getEnvVariables } from '../helpers';


const {VITE_URL_BACKEND} = getEnvVariables();

const backendApi = axios.create({
    baseURL:VITE_URL_BACKEND 
});

backendApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
     
     return config;
});

export { backendApi };
