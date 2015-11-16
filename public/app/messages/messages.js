import angular from 'angular';
import MessageCtrl from './messages.controller';
import AppRouteConfig from '../config/route/route';
import MessageModule from './message/message';

export default angular
  .module('app.func1', [
    AppRouteConfig.name,
    MessageModule.name
  ])
    .config(MessageCtrl.routeConfig);
