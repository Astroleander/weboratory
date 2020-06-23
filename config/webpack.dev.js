const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 18000,
    proxy: {
      "/api/bing": {
        target: "http://www.bing.com/",
        pathRewrite: {
          "^/api/v1/bing": ""
        },
        changeOrigin: true,
        secure: false
      },
      "/api/ecb": {
        target: "https://www.ecb.europa.eu/",
        pathRewrite: {
          "^/api/v1/ecb": ""
        },
        changeOrigin: true,
        secure: false
      }
    }
  }
});