import { Vaxios } from "./Axios";
import { message } from "antd";
import { storage } from "../utils/Storage";
const transform = {
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const token = storage.get("token");
    if (token) {
      // jwt token
      config.headers = {
        Authorization: "Bearer " + token,
        ...config.headers,
      };
    }
    return config;
  },
  /**
   * 响应拦截器
   * @param {*} response
   * @returns
   */
  responseInterceptors: (response) => {
    switch (response.data.code) {
      case 40001:
        message.error(response.data.message || "登录已过期");
        break;
      case 50000:
        message.error(response.data.message || "服务器错误");
        break;
    }
    return response.data;
  },
  responseInterceptorsCatch: (error) => {
    console.log("[Log] error-->", error);
    // 相应错误处理
    // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
    switch (error.response.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        console.log("其他错误信息");
    }
    return Promise.reject(error);
  },
};

const Axios = new Vaxios({
  baseURL: "/api",
  timeout: 100 * 1000,
  transform,
});

export default Axios;
