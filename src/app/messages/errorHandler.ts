import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Injectable()
export class MessageErrorHandler implements ErrorHandler {

  constructor(
    private messageService: MessageService,
    private ngZone: NgZone
  ) { }

  handleError (error): void {
    let message = error instanceof Error ? error.message : error.toString();
    this.ngZone.run(() => this.messageService.reportMessage(new Message(message, true)), 0);
  }

}
