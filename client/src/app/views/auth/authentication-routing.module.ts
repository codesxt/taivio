import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      title: 'Acceso'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Acceder'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Registro'
        }
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'Salir'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
