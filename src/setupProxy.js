const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // your API endpoint
    createProxyMiddleware({
      target: 'http://appwrite.com', // your API server domain
      changeOrigin: true,
    })
  );
};
