import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { UtilService } from './util.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  public BaseUrl = environment.host;
  private configUrl = 'assets/config.json';
  // public BaseUrl:string='http://192.168.1.7:7007/api/v2';
  private SECERET_KEY = 'com.yuangsong.102515';
  private CryptoJS: any;
  constructor(
      public http: HttpClient,
      private utilService: UtilService,
  ) {
  }
  getConfig() {
    return this.http.get(this.configUrl).toPromise();
  }
  public get(url: string, data) {
    if (localStorage.access_token) {
      data.access_token = localStorage.access_token;
    }
    data.timestamp = new Date().getTime() + '';
    const temp2 = this.utilService.sortAndEncrypt(data, this.SECERET_KEY);
    return this.http.get(this.BaseUrl + url + '?' + temp2);
  }
  public post(url: string, data): Observable<any> {
    return this.http.post(this.BaseUrl + url, this.utilService.handleParams(data, this.SECERET_KEY)
    );
  }

  public uploadFile(url: string, data, file): Observable<any> {
    return this.http.post(this.BaseUrl + url, this.utilService.handleParams(data, this.SECERET_KEY, file)
    );
  }
}
