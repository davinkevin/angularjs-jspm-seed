/**
  * angularjs-jspm-seed
  * Created by kdavin on 23/10/2015.
  */

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
}