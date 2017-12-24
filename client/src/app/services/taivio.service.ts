import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class TaivioService {
  baseURL: string = environment.apiUrl;
  constructor(
    private http: Http
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
}
