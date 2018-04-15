import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        loadChildren: './views/home/home.module#HomeModule'
      },
      {
        path: 'auth',
        loadChildren: './views/auth/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: 'dashboard',
    component: FullLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './views/users/users.module#UsersModule'
      }
    ]
  },
  {
    path: 'admin',
    component: FullLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: '',
        loadChildren: './views/admin/admin.module#AdminModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
