import { Routes, RouterModule } from "@angular/router";
import { CategoryCountComponent } from "./core/categoryCount.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component";
import { ProductCountComponent } from "./core/productCount.component";
import { TableComponent } from "./core/table.component";

const childRouters: Routes = [
  {
    path: 'products',
    component: ProductCountComponent
  },
  {
    path: 'categories',
    component: CategoryCountComponent
  },
  {
    path: '',
    component: ProductCountComponent
  }
];

const routes: Routes = [
  {
    path: 'table/form/:mode/:id',
    component: FormComponent
  },
  {
    path: 'table/form/:mode',
    component: FormComponent
  },
  {
    path: 'nie',
    redirectTo: 'table/form/create',
    pathMatch: 'prefix'
  },
  {
    path: 'table',
    component: TableComponent,
    children: childRouters
  },
  {
    path: 'table/:category',
    component: TableComponent,
    children: childRouters
  },
  {
    path: '',
    redirectTo: '/table',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const routing = RouterModule.forRoot(routes);
