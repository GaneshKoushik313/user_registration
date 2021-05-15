const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/auth',createProxyMiddleware({target: 'https://react-auth-3d77f.web.app/',changeOrigin: true,})
  );
};