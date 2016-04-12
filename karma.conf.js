module.exports = {
  files: [
    'js/ionic.filter.bar.js',
    'js/ionic.filter.bar.directive.js',
    'js/ionic.filter.bar.config.js',
    'js/ionic.filter.bar.service.js',
    'js/ionic.filter.bar.modal.js',
    'test/unit/*.js'
  ],

  frameworks: ['jasmine'],
  reporters: ['progress'],
  port: 9876,
  colors: true,
  // possible values: 'OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG'
  logLevel: 'INFO',
  autoWatch: true,
  captureTimeout: 60000,
  singleRun: false,

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera (has to be installed with `npm install karma-opera-launcher`)
  // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
  // - PhantomJS
  // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
  browsers: ['PhantomJS']
};
