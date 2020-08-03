import { Injectable } from '@angular/core';
import $ from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    public add(params) {
        $.get('http://122.51.157.236:3001/api/v1/note/jiawang', params, (res) => {
            // alert('返回数据:' + JSON.stringify(res));
        });
    }
}
