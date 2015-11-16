module.exports = function (config) {
  config.set({
    frameworks: ['jspm', 'jasmine', 'jasmine-matchers'],

    basePath: 'public',

    files: [
      '../node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
    ],

    jspm: {
      config: 'config.js',
      loadFiles: ['app/**/*.spec.js'],
      serveFiles: ['app/**/*.+(js|html|css)']
    },

    proxies: {
      '/app/': '/base/app/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    reporters: ['dots', 'coverage'],

    preprocessors: {
      'app/**/!(*.spec).js': ['babel', 'coverage']
    },

    babelPreprocessor: { options: { stage: 0, sourceMap: 'inline' } },


    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: { 'app/**/*.js': 'isparta' },
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