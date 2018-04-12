import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    NgbModule,
    NgxQRCodeModule,
    ShareButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
