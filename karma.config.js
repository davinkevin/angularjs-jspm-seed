module.exports = function (config) {
  config.set({
    frameworks: ['jspm', 'jasmine', 'jasmine-matchers'],

    files: [
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
    ],

    jspm: {
      config: 'system.config.js',
      loadFiles: ['public/**/*.spec.js'],
      serveFiles: ['public/**/*.+(js|html|css)']
    },

    proxies: {
      '/public/': '/base/public/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    reporters: ['dots', 'coverage'],

    preprocessors: {
      'public/**/!(*.spec).js': ['babel', 'coverage']
    },

    babelPreprocessor: { options: { stage: 0, sourceMap: 'inline' } },


    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: { 'public/**/*.js': 'isparta' },
      dir: 'reports/coverage/',
      reporters: [
        {type: 'html'}, {type: 'json'}, {type: 'lcov'}, {type: 'text-summary'}
      ]
    },

    browsers: ['PhantomJS'],
    singleRun : false,
    browserNoActivityTimeout: 75000
  });
};