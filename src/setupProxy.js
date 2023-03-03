const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://89.108.81.191:8081/api",
      changeOrigin: true,
    })
  );
};
