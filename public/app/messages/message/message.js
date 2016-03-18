import {Component, Module} from '../../decorators.js';
import template from './message.html!text';

@Module({
  name : 'app.func1.subFunc1'
})
@Component({
  selector : 'message-with-snake-case',
  bindings : {
    text : '='
  },
  as : 'mic',
  template: template
})
export default class Message {
  constructor() {
    this.prefix = "A Component message";
  }
}