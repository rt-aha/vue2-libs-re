const path = require('path');
const Mock = require('./src/mock/tplt');

console.log(Mock);

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'mock'),
    compress: true,
    port: 7000,
    overlay: {
      warnings: false,
      errors: true
    },
    before(app) {
      Mock(app);
    }
  }
};
