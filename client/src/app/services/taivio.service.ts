import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TaivioService {
  baseURL: string = environment.apiUrl;
  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  getStatistics(): any{
    let headers = new Headers({

    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.get(this.baseURL+'/api/v1/stats', options).map(
      (response: Response) => response.json()
    );
  }

  shorten(longUrl: string): any{
    let headers = new Headers({

    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.baseURL+'/api/v1/shorten', {url:longUrl} ,options).map(
      (response: Response) => response.json()
    );
  }

  shortenToList(longUrl: string, listId? : string): any{
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.baseURL+'/api/v1/shorten-tolist', {url:longUrl} ,options).map(
      (response: Response) => response.json()
    );
  }

  getUrls(pageNumber: number = 0, pageSize: number = 1): any{
    let headers = new Headers({

    });
    let params = new URLSearchParams();
    params.append('page[number]', pageNumber+"");
    params.append('page[size]', pageSize+"");
    let options = new RequestOptions({
      headers: headers,
      params: params
    });
    return this.http.get(this.baseURL+'/api/v1/urls', options).map(
      (response: Response) => response.json()
    );
  }

  getUrlList(pageNumber: number = 0, pageSize: number = 1, listId? : string): any{
    let list = '';
    if(listId) list = listId;
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let params = new URLSearchParams();
    params.append('page[number]', pageNumber+"");
    params.append('page[size]', pageSize+"");
    let options = new RequestOptions({
      headers: headers,
      params: params
    });
    return this.http.get(this.baseURL+'/api/v1/url-list/' + list, options).map(
      (response: Response) => response.json()
    );
  }

  getUrlCount(): any{
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.get(this.baseURL+'/api/v1/stats/urlcount', options).map(
      (response: Response) => response.json()
    );
  }
}
