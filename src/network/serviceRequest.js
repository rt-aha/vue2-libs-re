import axios from 'axios';
import networkConfig from '@/network/headerConfig';

function checkMethodValue(method) {
  const positionMethods = ['get', 'post', 'put', 'delete', 'patch'];
  const isValidate = positionMethods.includes(method);

  if (!isValidate) {
    return false;
  }

  return true;
}

const beforeRequest = (config, apiUrl, payload) => {
  const headerConfig = {
    headers: networkConfig[config].headers,
  };

  const token = localStorage.getItem('token') || '';

  // 若有 token 且 設定檔中有 Authorization 這個 key
  if (token && networkConfig[config].headers.Authorization) {
    headerConfig.headers.Authorization = 'Bearer ' + token;
  }

  // 專門寫給AWS S3的 ...
  if (config === 'uploadImage') {
    headerConfig.headers['Content-Type'] = payload.type;
  }

  let fullApiUrl = '';
  if (typeof config === 'string') {
    fullApiUrl = networkConfig[config].rootUrl + apiUrl;
  }

  return { headerConfig, fullApiUrl };
};

// 請求攔截器
axios.interceptors.request.use(
  function(config) {
    // loadingInstance.startLoading();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

const ajaxRequest = async (method, apiUrl, payload, config) => {
  const requstMethods = {
    async get() {
      return await axios.get(apiUrl, config);
    },
    async post() {
      return await axios.post(apiUrl, payload, config);
    },
    async patch() {
      return await axios.patch(apiUrl, payload, config);
    },
    async put() {
      return await axios.put(apiUrl, payload, config);
    },
    // axios的delete不支援帶資料 ...
    async delete() {
      return await axios.request({
        method: 'delete',
        url: apiUrl,
        data: payload,
        headers: config.headers,
      });
    },
  };

  const res = await requstMethods[method]();
  return res;
};

// 回應攔截器
axios.interceptors.response.use(
  function(configParams) {
    // loadingInstance.endLoading();
    return configParams;
  },
  function(error) {
    // loadingInstance.endLoading();
    // badResHelper(error);
    return Promise.reject(error);
  },
);

const afterRequest = res => {
  // 過濾出需要的內容
  return {
    status: res.request.status,
    header: res.headers,
    code: res.data.code,
    data: res.data.data,
  };
};

/**
 *
 * @param method ajax方法
 * @param apiUrl api路徑(去除根url)
 * @param payload 參數
 * @param header 是否使用特別設定的頭部，預設看config檔案
 */

const serviceRequest = async (method, apiUrl, payload = {}, header = 'defaultConfig') => {
  // 檢查HTTP Verbs是否正確
  const isValidate = checkMethodValue(method);
  if (!isValidate) return;

  // 設定header和api url
  const { headerConfig, fullApiUrl } = beforeRequest(header, apiUrl, payload);

  // 送出request
  const response = await ajaxRequest(method, fullApiUrl, payload, headerConfig);

  // 回傳data
  return afterRequest(response);
};

export default serviceRequest;
