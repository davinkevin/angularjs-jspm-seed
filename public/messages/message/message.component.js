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
class Message {}

export default Message;