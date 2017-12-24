import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaivioService } from '../../services/taivio.service';

@Component({
  templateUrl: 'home.component.html',
  providers: [ TaivioService ]
})
export class HomeComponent implements OnInit{
  result   : any     = null;
  longUrl  : string  = "";
  isCopied : boolean = false;
  error    : string  = "";

  urls : any = [];

  total    : number = 1;
  page     : number = 1;
  pageSize : number = 10;

  constructor(
    private taivioService : TaivioService
  ) { }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.taivioService.getUrls(this.page-1, this.pageSize)
    .subscribe(
      data => {
        this.urls = data.data;
        this.total = data.meta['total-items'];
      },
      error => {
        console.log(error.json());
      }
    );
  }

  onPageChange(event: Event){
    console.log(event);
    this.loadData();
  }

  shortenUrl(){
    this.isCopied = false;
    this.error    = "";
    if(this.longUrl.length > 0){
      this.taivioService.shorten(this.longUrl)
      .subscribe(
        data => {
          this.result = data;
          this.loadData();
        },
        error => {
          this.error = error.json().message;
        }
      )
    }
  }

}
