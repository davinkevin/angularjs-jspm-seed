import angular from 'angular';
import Func1 from './messages/messages';
import Config from './config/config';

let app = angular.module('app', [
  Func1.$angularModule.name,
  Config.name
]);

angular.element(document).ready(() =>  angular.bootstrap(document, [ app.name ], { strictDi: false }));
