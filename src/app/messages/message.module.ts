import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageErrorHandler } from "./errorHandler";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";

@NgModule({
  imports: [BrowserModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
  providers: [
    MessageService,
    {
      provide: ErrorHandler,
      useClass: MessageErrorHandler
    }
  ]
})
export class MessageModule { }
