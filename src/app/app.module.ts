import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';
import { FormComponent } from './core/form.component';
import { MessageComponent } from './messages/message.component';
import { TableComponent } from './core/table.component';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
