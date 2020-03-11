const path = require('path');
const Mock = require('./src/mock/tplt');

module.exports = {
  chainWebpack: config => {
    // 可以將svg檔案直接引入當組建使用
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  devServer: {
    contentBase: path.join(__dirname, 'mock'),
    compress: true,
    port: process.env.VUE_APP_BASE_PORT || 7000,
    overlay: {
      warnings: false,
      errors: true,
    },
    before(app) {
      if (process.env.VUE_APP_ENV_TYPE === 'dev_mock') {
        Mock(app); // `dev_mock` 才啟用
      }
    },
  },
};
