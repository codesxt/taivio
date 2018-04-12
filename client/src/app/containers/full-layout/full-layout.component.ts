import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
  public options = {
    position        : ['bottom', 'right'],
    timeOut         : 1500,
    lastOnBottom    : true,
    maxLength       : 0,
    showProgressBar : true,
    pauseOnHover    : true,
    clickToClose    : false
  };
  constructor(
    private notificationsService : NotificationsService
  ){ }
}
