import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { TaivioService } from '../../services/taivio.service';

@Component({
  templateUrl: 'admin.component.html',
  providers: [ TaivioService ]
})
export class AdminComponent {
  constructor(
    private taivioService : TaivioService,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(){

  }
}
