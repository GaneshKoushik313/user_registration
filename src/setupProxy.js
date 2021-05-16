const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/auth',createProxyMiddleware({target: 'https://react-auth-be.web.app',changeOrigin: true,})
  );
};