const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/auth',createProxyMiddleware({target: 'http://loginapi-env-1.eba-mqms6tjk.us-east-2.elasticbeanstalk.com',changeOrigin: true,})
  );
};