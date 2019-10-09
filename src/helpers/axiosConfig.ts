import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};
const axiosConfig = axios.create({
    baseURL: 'https://jobs.github.com/positions.json?markdown=true',
    headers
});

export default axiosConfig;
