// 有 VUE_APP_BASE_PORT 表示有自定義port
const baseApiPORT = process.env.VUE_APP_BASE_PORT ? process.env.VUE_APP_BASE_PORT : '';
const baseApiUrl = process.env.VUE_APP_BASE_API + baseApiPORT;

const networkConfig = {
  defaultConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ',
    },
  },
  // 自行設定
  placeholderConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'text/json;charset=utf-8',
    },
  },
};

export default networkConfig;
