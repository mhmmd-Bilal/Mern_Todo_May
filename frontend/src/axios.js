import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/todo'
});

export default axiosInstance