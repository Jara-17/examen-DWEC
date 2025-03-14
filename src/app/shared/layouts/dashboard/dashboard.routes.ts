import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from '../../../private/product/product.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'product:id',
        component: ProductComponent
      }
    ]
  }
];