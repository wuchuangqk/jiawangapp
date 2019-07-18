import { Injectable } from '@angular/core';
import sryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  public handleParams(data, SECERET_KEY, file?): FormData {
    data.access_token = localStorage.access_token;
    data.timestamp = new Date().getTime() + '';
    const signature = this.hamcsha1(this.sortParams(data), SECERET_KEY);
    data.signature = signature;
    const formData = new FormData();
    for (const i in data) {
      formData.append(i, encodeURIComponent(data[i]));
    }
    if (file) {
      formData.append('file', file);
    }
    return formData;
  }
  sortAndEncrypt(paramValues, SECERET_KEY): string {
    let paramsStr = this.sortParams(paramValues);
    const signature = this.hamcsha1(paramsStr, SECERET_KEY);
    paramsStr += '&signature=' + encodeURIComponent(signature);
    return paramsStr;
  }


  /**
   * 签名
   */
  public hamcsha1(plaintext: string, SECERET_KEY): string {
    const ciphertext = sryptoJs.HmacSHA1(plaintext, SECERET_KEY);
    return sryptoJs.enc.Base64.stringify(ciphertext);
  }


  /**
   * 参数排序
   */
  public sortParams(params) {
    const keys = [];
    for (const item in params) {
      keys.push(item);
    }
    // 1排序key
    keys.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

    let finalStr = '';
    length = keys.length;
    let i = 0;
    for (const key of keys) {
      const value = encodeURIComponent(params[key]);
      finalStr += key + '=' + value;
      if (i < length - 1) {
        finalStr += '&';
      }
      i++;
    }
    return finalStr;
  }
}
