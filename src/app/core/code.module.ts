import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { FormComponent } from './form.component';
import { SharedState } from './sharedState.model';
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
  providers: [
    SharedState
  ]
})
export class CoreModule { }
