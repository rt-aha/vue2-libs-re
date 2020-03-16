import axios from 'axios';
import networkConfig from '@/network/headerConfig';

// 請求攔截器
axios.interceptors.request.use(
  function(config) {
    // console.log('axios-interceptor-request---success');
    return config;
  },
  function(error) {
    // console.log('axios-interceptor-request---fail');
    return Promise.reject(error);
  },
);

// 回應攔截器
axios.interceptors.response.use(
  function(config) {
    // console.log('axios-interceptor-response---success');
    return config;
  },
  function(error) {
    // console.log('axios-interceptor-response---fail');
    return Promise.reject(error);
  },
);

/**
 *
 * @param method ajax方法
 * @param apiUrl api路徑(去除根url，從/開始)
 * @param payload 參數
 * @param header 是否使用特別設定的頭部，預設看config檔案
 */

const serviceRequest = async (method, apiUrl, payload = {}, headerConfig = 'defaultConfig') => {
  // 檢查HTTP Verbs是否正，不正確就返回
  const isValidate = serviceRequest.checkHttpMethod(method);
  if (!isValidate) return;

  // 設定頭部
  const header = serviceRequest.writeheader(headerConfig);

  // 設定url
  const reqUrl = serviceRequest.setUrl(apiUrl, headerConfig);

  // 送出request
  const response = await serviceRequest.ajaxRequest(method, reqUrl, payload, header);

  // 回傳data
  return serviceRequest.afterRequest(response);
};

serviceRequest.checkHttpMethod = function(httpMethod) {
  const allowedMethods = ['get', 'post', 'put', 'delete', 'patch'];
  const isValidate = allowedMethods.includes(httpMethod);

  if (!isValidate) {
    return false;
  }
  return true;
};

// 設定api url
serviceRequest.setUrl = function(apiUrl, headerConfigName) {
  let fullApiUrl = networkConfig[headerConfigName].rootUrl + apiUrl;
  return fullApiUrl;
};

// 設定 header
serviceRequest.writeheader = function(headerConfigName) {
  const config = {};

  // 設定頭部
  config.headers = this.setHeader(headerConfigName);

  // 設定token，如果有就返回，沒有回傳false
  const token = this.checkTokenExist(headerConfigName);

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
};

// 設定頭部，設定檔寫在 '@/network/headerConfig'
serviceRequest.setHeader = function(headerConfigName) {
  return networkConfig[headerConfigName].headers;
};

// 如果有token返回token，如果沒有返回false
serviceRequest.checkTokenExist = function(headerConfigName) {
  const token = localStorage.getItem('token');
  const hasToken = token && token !== '';

  // 如果設定檔有對應的key值才允許寫入
  const needAuthKey = 'Authorization' in networkConfig[headerConfigName].headers;

  if (hasToken && needAuthKey) {
    return token;
  }

  return false;
};

// 發送request
serviceRequest.ajaxRequest = async (method, fullApiUrl, payload, config) => {
  const requstMethods = {
    async get() {
      return await axios.get(fullApiUrl, config);
    },
    async post() {
      return await axios.post(fullApiUrl, payload, config);
    },
    async patch() {
      return await axios.patch(fullApiUrl, payload, config);
    },
    async put() {
      return await axios.put(fullApiUrl, payload, config);
    },
    // axios的delete不支援帶資料 ...
    async delete() {
      return await axios.request({
        method: 'delete',
        url: fullApiUrl,
        data: payload,
        headers: config.headers,
      });
    },
  };

  const res = await requstMethods[method]();
  return res;
};

serviceRequest.afterRequest = function(res) {
  // 過濾出需要的內容
  return {
    status: res.request.status,
    header: res.headers,
    code: res.data,
    data: res.data,
  };
};

export default serviceRequest;
