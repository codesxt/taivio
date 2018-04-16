import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { StatsComponent } from './stats/stats.component';
import { UrlsComponent } from './urls/urls.component';

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
      },
      {
        path: 'urls',
        component: UrlsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
