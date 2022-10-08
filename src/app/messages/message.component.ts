import { Component } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
  selector: 'paMessages',
  templateUrl: 'message.component.html'
})
export class MessageComponent {

  lastMessage: Message;

  constructor (
    messageService: MessageService
  ) {
    messageService.registerMessageHandler(message => this.lastMessage = message);
  }

}
