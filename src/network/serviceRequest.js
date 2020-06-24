import axios from 'axios';
import networkConfig from '@/network/headerConfig';

// 請求攔截器
axios.interceptors.request.use(
  function(config) {
    // console.log('發送請求成功');
    return config;
  },
  function(error) {
    // console.log('發送請求失敗');
    return Promise.reject(error);
  },
);

// 回應攔截器
axios.interceptors.response.use(
  function(res) {
    // console.log('回應請求成功');
    return res;
  },
  function(res) {
    // console.log('回應請求失敗');
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

const serviceRequest = (() => {
  // 檢查HTTP Verbs是否正，不正確就返回
  function checkHttpMethod(httpMethod) {
    const allowedMethods = ['get', 'post', 'put', 'delete', 'patch'];
    const isValidate = allowedMethods.includes(httpMethod);

    if (!isValidate) {
      return false;
    }
    return true;
  }

  // 設定頭部，使用哪一種header設定檔，寫在'@/network/headerConfig'
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

  // 設定api url
  function setUrl(apiUrl, headerConfigName) {
    return networkConfig[headerConfigName].rootUrl + apiUrl;
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

  // 回傳data，只擷取需要的部分，如有需要再擴充
  function afterRequest(res) {
    // 過濾出需要的內容
    return {
      status: res.status,
      code: res.data.code || '-2', // -1:後端錯誤時返回, -2:沒有code
      header: res.headers,
      data: res.data,
    };
  }

  // 發送前檢查 --> 增加header --> 設定api url --> 發起 http request --> 回傳需要的資料
  return async function(method, reqUrl, payload, options = {}) {
    const isValidate = checkHttpMethod(method);
    if (!isValidate) {
      throw new Error(`Http Method需為, 'get', 'post', 'put', 'patch' or 'delete'`);
    }

    const header = writeheader(options.usedHeaderConfigName);
    const apiUrl = setUrl(reqUrl, options.usedHeaderConfigName);
    const response = await ajaxRequest(method, apiUrl, payload, header);

    return afterRequest(response);
  };
})();

export default serviceRequest;
