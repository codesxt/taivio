import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { TaivioService } from '../../services/taivio.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [ TaivioService ]
})
export class DashboardComponent {
  apiUrl : string = environment.apiUrl;
  user : any = null;

  urlList : any = null;
  urls : any = [];

  total    : number = 1;
  page     : number = 1;
  pageSize : number = 10;

  selectedUrl : string;

  result   : any     = null;
  longUrl  : string  = "";
  isCopied : boolean = false;
  error    : string  = "";
  constructor(
    private taivioService : TaivioService,
    private modalService: NgbModal,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(){
    this.user = this.authenticationService.getCurrentUser();
    this.loadData();
  }

  shortenUrl(){
    this.isCopied = false;
    this.error    = "";
    if(this.longUrl.length > 0){
      this.taivioService.shortenToList(this.longUrl)
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

  loadData(){
    this.taivioService.getUrlList(this.page-1, this.pageSize)
    .subscribe(
      data => {
        this.urlList = data.data;
        this.urls = data.data.urls;
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

  open(content, url) {
    this.selectedUrl = url;
    const modalRef = this.modalService.open(content).result.then(
      (result) => {

      }, (reason) => {

      }
    );
  }

  openShare(content, url) {
    this.selectedUrl = url;
    const modalRef = this.modalService.open(content).result.then(
      (result) => {

      }, (reason) => {

      }
    );
  }
}
