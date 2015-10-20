import angular from 'angular';
import 'angular-route';

export default angular
  .module('app.config.route', [
    'ngRoute'
  ])
  .config($routeProvider => $routeProvider.otherwise({redirectTo: '/'}))
  .config($locationProvider => $locationProvider.html5Mode(true));