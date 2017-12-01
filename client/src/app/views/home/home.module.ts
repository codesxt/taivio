import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbModule
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
