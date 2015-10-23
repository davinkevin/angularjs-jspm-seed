/**
  * angularjs-jspm-seed
  * Created by kdavin on 23/10/2015.
  */
import template from './messages.html!text';

export default function routeConfig($routeProvider) {
  "ngInject";
  $routeProvider.
    when('/messages', {
      template: template,
      controller: 'Func1Ctrl',
      controllerAs: 'mc'
    });
}
