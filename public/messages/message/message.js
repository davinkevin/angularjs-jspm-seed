import angular from 'angular';
import Message from './message.component';

export default angular
  .module('app.func1.subFunc1', [])
  .controller(Message.name, Message)
  .directive(Message.$directiveName, Message.component);
