import angular from 'angular';

class MyController {
  constructor () {
    this.pageName = "Foo !";
    this.messages = [];
  }

  populate() {
    this.messages.push({ id : 1, text : 'The first message'});
    this.messages.push({ id : 2, text : 'The second message'});
    this.messages.push({ id : 3, text : 'The third message'});
    this.messages.push({ id : 4, text : 'The fourth message'});
  }
}

export default angular
  .module('myCtrl', [])
  .controller('MyController', MyController);
