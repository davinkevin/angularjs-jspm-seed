import angular from 'angular';
import Message from './message.component';

export default angular
  .module('app.func1.subFunc1', [])
  .directive(Message.$directiveName, Message.component);
