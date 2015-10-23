import angular from 'angular';
import ctrl from './messages.controller';
import routeConfig from './messages.route';
import AppRouteConfig from '../config/route';

export default angular
  .module('app.func1', [
    AppRouteConfig.name
  ])
    .controller('Func1Ctrl', ctrl)
    .config(routeConfig);
