const path = require("path");
const pkg = require("./package.json");

module.exports = {
  entry: {
    [pkg.name]: ["./src/utils/polyfill", "./src/app.js"]
  },
  html: {
    template: "src/document.ejs",
    filename: "index.html"
  },

  // 优化，可参考：https://webpack.docschina.org/plugins/split-chunks-plugin/
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          priority: -10,
          enforce: true
        }
      }
    }
  },

  // 别名
  alias: {
    "~": path.join(__dirname, "./src")
  },

  // 不同环境配置
  env: {
    // 生产环境
    production: {
      publicPath: "./",
      outputPath: "../site"
    }
  }
};
