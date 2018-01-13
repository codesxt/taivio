import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ShareModule } from '@ngx-share/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TaivioService } from '../../services/taivio.service';

@NgModule({
  imports: [
    HomeRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    ClipboardModule,
    NgbModule,
    NgxQRCodeModule,
    ShareModule,
    ShareButtonsModule,
    HttpClientModule
  ],
  declarations: [ HomeComponent ],
  providers :[
    HttpClientModule
  ]
})
export class HomeModule { }
