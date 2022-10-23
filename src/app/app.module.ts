import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModelModule } from './model/model.module';
import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsGuard } from './terms.guard';
import { LoadGuard } from './load.guard';

@NgModule({
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    BrowserAnimationsModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    TermsGuard,
    LoadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
