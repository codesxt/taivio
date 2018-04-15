import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { TaivioService } from '../../../services/taivio.service';

@Component({
  templateUrl: 'stats.component.html',
  providers: [ TaivioService ]
})
export class StatsComponent {
  urlCount : number = null;
  constructor(
    private taivioService : TaivioService,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(){
    this.taivioService.getUrlCount()
    .subscribe(
      (response) => {
        this.urlCount = response.data;
      },
      (error) => {

      }
    )
  }
}
