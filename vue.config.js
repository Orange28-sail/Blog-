const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "For Front-End";
      args[0].keywords = "keywords内容";
      args[0].description = "description内容";
      return args;
    });
  },
  devServer: {
    port: 8080,
    host: "127.0.0.1",
    // open: true,
    https: false,
    proxy: {
      "/": {
        target: "http://127.0.0.1:3000",
        ws: false,
        changeOrigin: true,
        // path
      },
    },
  },
});
