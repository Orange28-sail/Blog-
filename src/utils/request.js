import axios from "axios";
const request = axios.create({
  // 指定请求的根路径
  baseURL: "http://127.0.0.1:3000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// 响应拦截器;
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default request;
