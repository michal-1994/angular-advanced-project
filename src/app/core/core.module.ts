import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ModelModule } from '../model/model.module';
import { FormComponent } from './form.component';
import { SharedState, SHARED_STATE } from './sharedState.model';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModelModule
  ],
  declarations: [
    TableComponent,
    FormComponent
  ],
  exports: [
    ModelModule,
    TableComponent,
    FormComponent
  ],
  providers: [{ provide: SHARED_STATE, useValue: new Subject<SharedState>() }]
})
export class CoreModule { }
