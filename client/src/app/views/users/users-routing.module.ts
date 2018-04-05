import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administración de Usuarios'
    },
    component: UsersComponent
  },{
    path: ':id',
    component: UserDetailsComponent,
    data: {
      title: 'Detalles de Usuario'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class UsersRoutingModule {}
