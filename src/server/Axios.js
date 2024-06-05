import axios from "axios";
import { isFunction } from "../utils/is";
export class Vaxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }
  /**
   * 创建axios实例
   * @param {*} config
   */
  createAxios(config) {
    this.axiosInstance = axios.create(config);
  }
  getAxios() {
    return this.axiosInstance;
  }
  getTransform() {
    const { transform } = this.options;
    return transform;
  }
  /**
   * 重新配置
   * @param {*} config
   */
  configAxios(config) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }
  /**
   * 配置请求头
   * @param {*} headers
   * @returns
   */
  setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * 设置拦截器
   */
  setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    // 请求拦截器成功处理
    this.axiosInstance.interceptors.request.use((config) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);
    // 请求拦截器错误处理
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );
    // 响应拦截器成功处理
    this.axiosInstance.interceptors.response.use((res) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);
    // 响应错误拦截器
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }

  request(config, options) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          resolve(res);
          reject(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
