const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // your API endpoint
    createProxyMiddleware({
      target: 'https://cloud.appwrite.io/v1',
      changeOrigin: true,
    })
  );
};
