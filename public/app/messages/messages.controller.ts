///<reference path="../decorators.d.ts"/>

/**
  * angularjs-jspm-seed
  * Created by kdavin on 23/10/2015.
  */

import {RouteConfig, View} from '../decorators';
import template from './messages.html!text';


@RouteConfig({
  path : '/messages',
    as : 'mc'
})
@View({
  template : template
})
class Func1Ctrl {
    private pageName : string = "An Angular Seed Project :D";
    private messages : Array<any> = [];

  constructor ( private $http : ng.IHttpService) {
    "ngInject";
  }

  populate() {
    this.messages.push({ id : 1, text : 'The first message'});
    this.messages.push({ id : 2, text : 'The second message'});
    this.messages.push({ id : 3, text : 'The third message'});
    this.messages.push({ id : 4, text : 'The fourth message'});
  }
}

export default Func1Ctrl;