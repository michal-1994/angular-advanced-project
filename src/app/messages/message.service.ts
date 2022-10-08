import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Message } from "./message.model";

@Injectable()
export class MessageService {

  private subject = new Subject<Message>();
  // private handler: (message: Message) => void;

  reportMessage (message: Message) {
    this.subject.next(message);
    // if (this.handler != null) {
    //   this.handler(message);
    // }
  }

  get messages(): Observable<Message> {
    return this.subject;
  }

  // registerMessageHandler (handler: (message: Message) => void) {
    // this.handler = handler;
  // }

}
