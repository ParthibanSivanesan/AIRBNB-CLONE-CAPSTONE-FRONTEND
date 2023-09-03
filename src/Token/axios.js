import axios from "axios";

const axiosConnect = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true,
})

export default axiosConnect;

