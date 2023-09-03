import axios from "axios";

const axiosConnect = axios.create({
    //baseURL: 'http://localhost:9000',
    baseURL: 'https://airbnb-clone-backend-freo.onrender.com',
    withCredentials: true,
})

export default axiosConnect;

