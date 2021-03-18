module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // implementation: require("sass"),
        prependData: '@import "./src/styles/init.scss";',
        // additionalData: '@import "./src/styles/init.scss";'
      },
    },
    sourceMap: true,
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': './src/*',
  //     }
  //   }
  // },
  devServer: {
    progress: false,
    port: 7010,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
