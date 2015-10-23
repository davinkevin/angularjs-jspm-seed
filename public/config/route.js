import angular from 'angular';
import angularRoute from 'angular-route';

export default angular
  .module('app.config.route', [
    angularRoute.name
  ])
  .config($routeProvider => { "ngInject"; $routeProvider.otherwise({redirectTo: '/'}) })
  .config($locationProvider => { "ngInject"; $locationProvider.html5Mode(true) });