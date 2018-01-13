import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaivioService } from '../../services/taivio.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtons } from '@ngx-share/core';

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

  selectedUrl : string;

  constructor(
    private taivioService : TaivioService,
    private modalService: NgbModal,
    public  share: ShareButtons
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

  download(){
    let img = document.getElementById('qr_img').getElementsByTagName('div')[0].getElementsByTagName('img')[0];
    let url = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    window.open(url);
  }
}
