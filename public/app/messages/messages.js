/**
  * angularjs-jspm-seed
  * Created by kdavin on 23/10/2015.
  */
import {RouteConfig, View, Module, Run} from '../decorators.js';
import CustomLogService from '../common/service/customLogService';
import AppRouteConfig from '../config/route/route';
import MessageModule from './message/message';
import template from './messages.html!text';

@Module({
  name : 'app.func1',
  modules : [
    AppRouteConfig,
    MessageModule,
    CustomLogService
  ]
})
@Run(($log) => { "ngInject"; $log.info("Running app.func1 ..."); })
@RouteConfig({
  path : '/messages',
    as : 'mc'
})
@View({
  template : template
})
class Func1Ctrl {

  constructor (CustomLogService) {
    "ngInject";
    this.customeLogService = CustomLogService;
    this.pageName = "An Angular Seed Project :D";
    this.messages = [];
  }

  populate() {
    this.customeLogService.print('Add 4 messages');
    this.messages.push({ id : 1, text : 'The first message'});
    this.messages.push({ id : 2, text : 'The second message'});
    this.messages.push({ id : 3, text : 'The third message'});
    this.messages.push({ id : 4, text : 'The fourth message'});
  }
}

export default Func1Ctrl;