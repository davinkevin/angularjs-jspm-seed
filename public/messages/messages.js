import angular from 'angular';
import MessageCtrl from './messages.controller';
import AppRouteConfig from '../config/route';
import MessageModule from './message/message';

export default angular
  .module('app.func1', [
    AppRouteConfig.name,
    MessageModule.name
  ])
    .controller(MessageCtrl.name, MessageCtrl)
    .config(MessageCtrl.routeConfig);
