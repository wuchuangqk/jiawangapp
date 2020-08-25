import { Component, OnInit } from '@angular/core';
import {DetailBasePage} from '../../../base/detail-base-page';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../service/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-cultural-detail',
  templateUrl: './cultural-detail.component.html',
  styleUrls: ['./cultural-detail.component.scss'],
})
export class CulturalDetailComponent extends DetailBasePage implements OnInit {
  public contentTitle = '';
  constructor(
      public http: HttpService,
      public router: Router,
      public dialogService: DialogService,
      public sanitizer: DomSanitizer,
      public navController: NavController,
      public route?: ActivatedRoute,
  ) {
    super(http, router, dialogService, sanitizer, navController);
    this.id = this.query('id');
    this.title = '党建园地';
    this.url = this.query('url');
    console.log(this.url);
  }

  ngOnInit() {
    this.request(`${this.url}/${this.id}`, {}).then((res) => {
      this.contentTitle = res.data.infoTitle;
      this.content = this.transform(res.data.content);
      setTimeout(()=>{
      this.getFileListByHtml();
      },200)
    });
  }

  getFileType(filePath){
    var startIndex = filePath.lastIndexOf(".");
    if(startIndex != -1)
      return filePath.substring(startIndex+1, filePath.length).toLowerCase();
    else return "";
  }
  getFileListByHtml(){
    var fileList = new Array<IDownFile>();
    var s= document.getElementsByClassName("detail-content")
    if(s.length>0){
      var html = s[0];
      var ATageList = html.getElementsByTagName("a");
      // @ts-ignore
      for (let item of ATageList){
        if(this.getFileType(item.href)){
          fileList.push({
            fileext: "."+this.getFileType(item.href),
            fileurl: item.href,
            filename:item.innerText
          })
        }
      }
      console.log(fileList)
      this.fileList=fileList
    }
  }
}
