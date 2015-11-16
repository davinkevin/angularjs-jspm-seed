import {Component, View} from '../../decorators.js';
import template from './message.html!text';

@Component({
  selector : 'message-with-snake-case',
  bindToController : {
    text : '='
  },
  as : 'mic'
})
@View({
  template : template
})
class Message {
  constructor() {
    this.prefix = "A Component message";
  }
}

export default Message;