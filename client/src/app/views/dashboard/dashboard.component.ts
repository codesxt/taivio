import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
  user : any = null;

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(){
    this.user = this.authenticationService.getCurrentUser();
  }
}
