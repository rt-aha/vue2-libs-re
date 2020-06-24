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
  function(res) {
    // console.log('axios-interceptor-response---success');
    return res;
  },
  function(res) {
    // console.log('axios-interceptor-response---fail');
    if (res.status > 204) {
      // badResHelper(some erro msg ...);
      // do something ...
    }
    return Promise.reject(res);
  },
);

/**
 *
 * @param method ajax方法
 * @param apiUrl api路徑(去除根url，從/開始)
 * @param payload 參數
 * @param header 是否使用特別設定的頭部，預設看config檔案
 */

const serviceRequest = (function() {
  function checkHttpMethod(httpMethod) {
    const allowedMethods = ['get', 'post', 'put', 'delete', 'patch'];
    const isValidate = allowedMethods.includes(httpMethod);

    if (!isValidate) {
      return false;
    }
    return true;
  }

  // 設定api url
  function setUrl(apiUrl, headerConfigName) {
    return networkConfig[headerConfigName].rootUrl + apiUrl;
  }

  // 設定 header
  function writeheader(headerConfigName) {
    const config = {};

    console.log('headerConfigName', headerConfigName);
    // 設定頭部
    config.headers = networkConfig[headerConfigName].headers;
    // 設定token
    const accessToken = getToken(headerConfigName);
    if (accessToken) {
      config.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  }

  // 有token即返回，沒有返回false
  function getToken() {
    const token = localStorage.getItem('access_token');
    const hasToken = token && token !== '';
    if (!hasToken) {
      return false;
    }

    return token;
  }

  // 發送request
  async function ajaxRequest(method, fullApiUrl, payload, config) {
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
  }

  function afterRequest(res) {
    // 過濾出需要的內容
    return {
      status: res.status,
      code: res.data.code || '-1', // 錯誤訊息code
      header: res.headers,
      data: res.data,
    };
  }

  return async function(method, reqUrl, payload, options = {}) {
    // 檢查HTTP Verbs是否正，不正確就返回
    const isValidate = checkHttpMethod(method);
    if (!isValidate) {
      throw new Error(`Http Method需為, 'get', 'post', 'put', 'patch' or 'delete'`);
    }

    // 設定頭部，使用哪一種header設定檔，寫在'@/network/headerConfig'
    const header = writeheader(options.usedHeaderConfigName);

    // 設定url
    const apiUrl = setUrl(reqUrl, options.usedHeaderConfigName);

    // 送出request
    const response = await ajaxRequest(method, apiUrl, payload, header);

    // 回傳data
    return afterRequest(response);
  };
})();

console.log('serviceRequest', serviceRequest);

export default serviceRequest;
