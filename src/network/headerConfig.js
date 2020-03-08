// const baseApiUrl = process.env.VUE_APP_BASE_API;
const baseApiUrl = process.env.VUE_APP_BASE_API;

console.log(baseApiUrl);

const networkConfig = {
  defaultConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer '
    }
  },
  // 自行設定
  placeholderConfig: {
    rootUrl: baseApiUrl,
    headers: {
      'Content-Type': 'text/json;charset=utf-8'
    }
  }
};

export default networkConfig;
