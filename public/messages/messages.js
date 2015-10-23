import angular from 'angular';
import MessageCtrl from './messages.controller';
import AppRouteConfig from '../config/route';

export default angular
  .module('app.func1', [
    AppRouteConfig.name
  ])
    .controller('Func1Ctrl', MessageCtrl)
    .config(MessageCtrl.routeConfig);
