module.exports = function (config) {
  config.set({
    frameworks: ['jspm', 'jasmine', 'jasmine-matchers'],

    basePath: 'public',

    jspm: {
      config: 'config.js',
      loadFiles: ['**/*.spec.ts'],
      serveFiles: ['**/*.+(ts|html|css)'],
      stripExtension : true
    },

    proxies: {
      '/app/': '/base/app/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: { 'app/**/*.ts': 'isparta' },
      dir: '../reports/coverage/',
      reporters: [
        {type: 'html'},
        {type: 'json'},
        {type: 'lcov'},
        {type: 'text-summary'}
      ]
    },

    browsers: ['PhantomJS'],
    singleRun : false,
    browserNoActivityTimeout: 75000
  });
};