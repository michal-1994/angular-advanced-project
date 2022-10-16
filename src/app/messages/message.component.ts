import { Component } from "@angular/core";
import { NavigationCancel, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
  selector: 'paMessages',
  templateUrl: 'message.component.html'
})
export class MessageComponent {

  lastMessage: Message;

  constructor(
    messageService: MessageService,
    router: Router
  ) {
    messageService.messages.subscribe(message => this.lastMessage = message);
    router.events
      .pipe(filter(event => event instanceof NavigationEnd
        || event instanceof NavigationCancel))
      .subscribe(event => {
        this.lastMessage = null;
      });
  }

}
