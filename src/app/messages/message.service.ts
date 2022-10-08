import { Injectable } from "@angular/core";
import { Message } from "./message.model";

@Injectable()
export class MessageService {

  private handler: (message: Message) => void;

  reportMessage (message: Message) {
    if (this.handler != null) {
      this.handler(message);
    }
  }

  registerMessageHandler (handler: (message: Message) => void) {
    this.handler = handler;
  }

}
