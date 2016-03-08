exports.config = {

  baseUrl: 'http://localhost:8001/',

  directConnect: true,

  multiCapabilities: [
    { browserName: 'firefox' },
    { browserName: 'chrome' }
  ],

  specs: ['e2e/spec/*.js'],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};