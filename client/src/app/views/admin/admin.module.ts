import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { AdminComponent } from './admin.component';
import { StatsComponent } from './stats/stats.component';
import { UrlsComponent } from './urls/urls.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    NgbModule,
    NgxQRCodeModule,
    ShareButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  declarations: [
    AdminComponent,
    StatsComponent,
    UrlsComponent
  ]
})
export class AdminModule { }
