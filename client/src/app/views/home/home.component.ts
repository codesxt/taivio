import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaivioService } from '../../services/taivio.service';

@Component({
  templateUrl: 'home.component.html',
  providers: [ TaivioService ]
})
export class HomeComponent {
  result   : any     = null;
  longUrl  : string  = "";
  isCopied : boolean = false;
  error    : string  = "";

  constructor(
    private taivioService : TaivioService
  ) { }

  shortenUrl(){
    this.isCopied = false;
    this.error    = "";
    if(this.longUrl.length > 0){
      this.taivioService.shorten(this.longUrl)
      .subscribe(
        data => {
          this.result = data;
        },
        error => {
          this.error = error.json().message;
        }
      )
    }
  }

}
