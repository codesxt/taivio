import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { TaivioService } from '../../../services/taivio.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'urls.component.html',
  providers: [ TaivioService ]
})
export class UrlsComponent {
  urls : any = [];

  total    : number = 1;
  page     : number = 1;
  pageSize : number = 10;

  selectedUrl : string;
  constructor(
    private taivioService : TaivioService,
    private authenticationService : AuthenticationService,
    private modalService: NgbModal
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
