import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Message } from '../messages/message.model';
import { MessageModule } from '../messages/message.module';
import { MessageService } from '../messages/message.service';
import { ModelModule } from '../model/model.module';
import { Model } from '../model/repository.model';
import { FormComponent } from './form.component';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import { StatePipe } from './state.pipe';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModelModule,
    MessageModule
  ],
  declarations: [
    TableComponent,
    FormComponent,
    StatePipe
  ],
  exports: [
    ModelModule,
    TableComponent,
    FormComponent
  ],
  providers: [{
    provide: SHARED_STATE,
    deps: [MessageService, Model],
    useFactory: (messageService, model) => {
      let subject = new Subject<SharedState>();
      subject
        .subscribe(
          message => messageService.reportMessage(
            new Message(MODES[message.mode] + [message.id != undefined ? ` ${model.getProduct(message.id).name}` : ''])
          ));
      return subject;
    }
  }]
})
export class CoreModule { }
