import { Routes, RouterModule } from "@angular/router";
import { CategoryCountComponent } from "./core/categoryCount.component";
import { FormComponent } from "./core/form.component";
import { NotFoundComponent } from "./core/notFound.component";
import { ProductCountComponent } from "./core/productCount.component";
import { TableComponent } from "./core/table.component";
import { ModelResolver } from "./model/model.resolver";
import { TermsGuard } from "./terms.guard";

const childRouters: Routes = [
  {
    path: '',
    canActivate: [
      TermsGuard
    ],
    children: [
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
    ],
    resolve: {
      model: ModelResolver
    }
  }
];

const routes: Routes = [
  {
    path: 'table/form/:mode/:id',
    component: FormComponent,
    resolve: {
      model: ModelResolver
    }
  },
  {
    path: 'table/form/:mode',
    component: FormComponent,
    resolve: {
      model: ModelResolver
    },
    canActivate: [
      TermsGuard
    ]
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
