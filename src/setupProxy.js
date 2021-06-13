const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/auth',createProxyMiddleware({target: 'https://login-app-be.herokuapp.com',changeOrigin: true,})
  );
};