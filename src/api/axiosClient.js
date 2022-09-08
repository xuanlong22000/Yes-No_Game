import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
    //192.168.0.120  localhost
    baseURL: ' https://yesno.wtf/api',
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config) => {
    return config;
});

AxiosClient.interceptors.response.use(async (response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default AxiosClient; 