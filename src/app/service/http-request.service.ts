import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { UtilService } from './util.service';
import { environment } from '../../environments/environment.prod';
import { File as IFile } from '@ionic-native/file/ngx';
import {Events} from '@ionic/angular';
import {AppConfig} from '../app.config';
import {IndexedDBService} from './IndexedDBService';
@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {
    public BaseUrl = localStorage.selectIp|| environment.host;
    private configUrl = 'assets/config.json';
    private SECERET_KEY = 'com.8bpm.yuansong.keys.2020.05.89';
    private CryptoJS: any;

    constructor(
        public http: HttpClient,
        public file: IFile,
        private utilService: UtilService,
    ) {
        this.setBaseUrl();
    }

    getConfig() {
        return this.http.get(this.configUrl).toPromise();
    }
    setBaseUrl() {
        this.BaseUrl = localStorage.selectIp|| environment.host;
    }

    public get(url: string, data) {
        this.setBaseUrl();
        if (localStorage.access_token) {
            data.access_token = localStorage.access_token;
        }
        data.timestamp = new Date().getTime() + '';
        const temp2 = this.utilService.sortAndEncrypt(data, this.SECERET_KEY);
        return this.http.get(this.BaseUrl + url + '?' + temp2);
    }

    public post(url: string, data): Observable<any> {
        this.setBaseUrl();
        return this.http.post(this.BaseUrl + url, this.utilService.handleParams(data, this.SECERET_KEY));
    }

    public uploadFiles(url: string, data, files) {
        this.setBaseUrl();
        data.access_token = localStorage.access_token;
        data.timestamp = new Date().getTime() + '';
        const signature = this.utilService.hamcsha1(this.utilService.sortParams(data), this.SECERET_KEY);
        data.signature = signature;
        const formData = new FormData();
        for (const i in data) {
            formData.append(i, encodeURIComponent(data[i]));
        }
        if (files) {
            for (const file of files) {
                formData.append('file', file.file, file.name);
            }

        }
        return this.http.post(this.BaseUrl + url, formData);
    }
    public uploadFile(url: string, data, filePath) {
        this.setBaseUrl();
        data.access_token = localStorage.access_token;
        data.timestamp = new Date().getTime() + '';
        const signature = this.utilService.hamcsha1(this.utilService.sortParams(data), this.SECERET_KEY);
        data.signature = signature;
        const formData = new FormData();
        for (const i in data) {
            formData.append(i, encodeURIComponent(data[i]));
        }
        return new Promise(((resolve, reject) => {
            if (filePath) {
                if (filePath.slice(0, 7) != 'file://') {
                    filePath = 'file://' + filePath;
                }
                this.file.resolveLocalFilesystemUrl(filePath).then((entry: any) => {
                    entry.file(file => {
                        const blob: Blob = file as Blob;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const imgBlob = new Blob([reader.result], {type: blob.type});
                            formData.append('file', imgBlob, (blob as any).name);
                            this.http.post(this.BaseUrl + url, formData).toPromise().then((res) => {
                                resolve(res);
                            }).catch(error => {
                                reject(error);
                            });
                        };
                        reader.readAsArrayBuffer(blob);
                    });
                }).catch(error => console.log(JSON.stringify(error)));
            } else {
                this.http.post(this.BaseUrl + url, formData).toPromise().then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            }
        }));
    }
}
