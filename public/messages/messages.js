import angular from 'angular';
import AppRouteConfig from '../config/route'
import template from './messages.html!text'

class MyController {
  constructor ($http) {
    this.$http = $http;
    this.pageName = "An Angular Seed Project :D";
    this.messages = [];
  }

  populate() {
    this.messages.push({ id : 1, text : 'The first message'});
    this.messages.push({ id : 2, text : 'The second message'});
    this.messages.push({ id : 3, text : 'The third message'});
    this.messages.push({ id : 4, text : 'The fourth message'});
  }
}

function routeConfig($routeProvider) {
  $routeProvider.
    when('/messages', {
      template: template,
      controller: 'MyController',
      controllerAs: 'mc'
    });
}

MyController.$inject = ['$http'];
routeConfig.$inject = ['$routeProvider'];

export default angular
  .module('app.func1', [
    AppRouteConfig.name
  ])
    .controller('MyController', MyController)
    .config(routeConfig);
