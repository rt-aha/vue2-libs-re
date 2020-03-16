const path = require('path');

module.exports = {
  chainWebpack: config => {
    // 可以將svg檔案直接引入當組建使用
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  devServer: {
    progress: false,
    port: 7000,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
