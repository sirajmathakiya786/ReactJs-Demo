import axios from "axios";

const base_url = "http://localhost:6060/";
const axiosInstance = axios.create({
  baseURL: base_url,
});

const getToken = () => {
  return localStorage.getItem("token");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token,"token")
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance