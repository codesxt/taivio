import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      title: 'Administración'
    },
    children: [
      {
        path: 'stats',
        component: StatsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
