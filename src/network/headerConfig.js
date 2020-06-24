const baseApiUrl = process.env.VUE_APP_BASE_API;

const networkConfig = {
  defaultConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ',
    },
  },
  // 測試
  testConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  // 自行設定
  placeholderConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
};

export default networkConfig;
