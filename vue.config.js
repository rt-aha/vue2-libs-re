const path = require('path');
const Mock = require('./src/mock/tplt');

module.exports = {
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
