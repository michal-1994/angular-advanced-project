import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirstComponent } from './first.component';
import { OndemandComponent } from './ondemand.component';
import { SecondComponent } from './second.component';

let routing = RouterModule.forChild([
  {
    path: '',
    component: OndemandComponent,
    children: [
      {
        outlet: 'primary',
        path: '',
        component: FirstComponent
      },
      {
        outlet: 'left',
        path: '',
        component: SecondComponent
      },
      {
        outlet: 'right',
        path: '',
        component: SecondComponent
      }
    ]
  }
])

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    OndemandComponent,
    FirstComponent,
    SecondComponent
  ],
  exports: [
    OndemandComponent
  ]
})
export class OndemandModule { }
