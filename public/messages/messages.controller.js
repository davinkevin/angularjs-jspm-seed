/**
  * angularjs-jspm-seed
  * Created by kdavin on 23/10/2015.
  */
import template from './messages.html!text';

export default class MyController {

  constructor ($http) {
    "ngInject";
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

  static routeConfig($routeProvider) {
    "ngInject";
    $routeProvider.
      when('/messages', {
        template: template,
        controller: 'Func1Ctrl',
        controllerAs: 'mc'
      });
  }
}