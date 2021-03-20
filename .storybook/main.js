const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 
      // 'sass-loader'
      {
        loader: "sass-loader",
        options: {
          prependData: '@import "./src/styles/init.scss";',
          implementation: require("sass"),
        },
      },
    ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
}