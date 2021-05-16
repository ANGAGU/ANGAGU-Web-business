import proxy from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    proxy('/', {
      target: 'http://54.180.62.210:3000/',
    }),
  );
};
