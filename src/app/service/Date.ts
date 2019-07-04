import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateProvider {
  public date: Date;
  private weekList: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  constructor() {
    this.date = new Date();
  }
  public getCurrentDate(): string {
    return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;
  }
  public getDateFormat(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  // 获取传入日期是星期几
  public getFormatWeek(D: Date): string {
    return this.weekList[D.getDay()];
  }
  public DateTimeFormat(d: Date): string {
    return `${d.getFullYear()}-${this.addZero(d.getMonth() + 1)}-${this.addZero(d.getDate())} ${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}:${this.addZero(d.getSeconds())}`;
  }
  private addZero(num): string {
    num += '';
    if (num.length <= 1) {
      num = '0' + num;
    }
    return num;
  }
}
