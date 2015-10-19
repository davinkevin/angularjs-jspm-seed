import angular from 'angular';
import MyController from 'listing/message';

let myJspmApp = angular.module('myJspmApp', [
  MyController.name
]);

angular.element(document).ready(() =>  angular.bootstrap(document.body, [ myJspmApp.name ], { strictDi: true }));
