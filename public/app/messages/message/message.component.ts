/// <reference path="../../../../tools/tsd.d.ts" />
import {Component, View} from '../../decorators';
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
    private prefix : string;
    constructor() {
        this.prefix = "A Component message";
    }
}

export default Message;