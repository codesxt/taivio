import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-detail.component';
import { UsersRoutingModule } from './users-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ]
})
export class UsersModule { }
