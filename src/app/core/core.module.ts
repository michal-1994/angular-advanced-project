import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageModule } from '../messages/message.module';
import { ModelModule } from '../model/model.module';
import { FormComponent } from './form.component';
import { StatePipe } from './state.pipe';
import { TableComponent } from './table.component';
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './productCount.component';
import { CategoryCountComponent } from './categoryCount.component';
import { NotFoundComponent } from './notFound.component';
import { UnsavedGuard } from '../unsaved.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModelModule,
    MessageModule,
    RouterModule
  ],
  declarations: [
    TableComponent,
    FormComponent,
    StatePipe,
    ProductCountComponent,
    CategoryCountComponent,
    NotFoundComponent
  ],
  providers: [
    UnsavedGuard
  ],
  exports: [
    ModelModule,
    TableComponent,
    FormComponent
  ]
})
export class CoreModule { }
