import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};
const axiosConfig = axios.create({
  headers,
  baseURL: 'https://jobs.github.com/positions.json?markdown=true'
});

export default axiosConfig;
