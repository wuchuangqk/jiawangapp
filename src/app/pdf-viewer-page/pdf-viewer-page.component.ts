import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import $ from 'jquery';
import {FileService} from '../service/FileService';
import { SimplePdfViewerComponent, SimplePDFBookmark } from 'simple-pdf-viewer';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../service/dialog.service';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer/ngx";
@Component({
  selector: 'app-pdf-viewer-page',
  templateUrl: './pdf-viewer-page.component.html',
  styleUrls: ['./pdf-viewer-page.component.scss'],
  providers:[DocumentViewer]
})
export class PdfViewerPageComponent extends BasePage implements OnInit {
    public url = '';
  public file: IDownFile;
  public localFilePath = '';
  @ViewChild(SimplePdfViewerComponent) public pdfViewer: SimplePdfViewerComponent;

  @ViewChild('fullPageBtn') public fullPageBtn: ElementRef; // 定义此dom变量
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private events: Events,
      private document: DocumentViewer,
      public fileService: FileService,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
    console.log(this.getQueryParams());
    this.file = this.getQueryParams();
  }




  bookmarks: SimplePDFBookmark[] = [];

  // // how to open PDF document
  // openDocument(document: File) {
  //   const fileReader: FileReader = new FileReader();
  //   fileReader.onload = () => {
  //   };
  //   fileReader.readAsArrayBuffer(document);
  // }
  //
  // // how to create bookmark
  // createBookmark() {
  //   this.pdfViewer.createBookmark().then(bookmark => {
  //     if(bookmark) {
  //       this.bookmarks.push(bookmark);
  //     }
  //   })
  // }
  nextPage() {
    this.pdfViewer.nextPage();
  }
  ngOnInit() {
    const options: DocumentViewerOptions = {
      title: '文件预览'
    }
    // console.log(this.fullPageBtn.nativeElement);
    // this.dialogService.loading("文件加载中.....");
    // this.fileService.getFilePathByDownloadFile(this.file).then((res)=>{
    //   this.document.viewDocument(res, 'application/pdf', options);
    // })
      this.title= this.file.filename;
    this.dialogService.loading("文件加载中.....");
    this.fileService.downloadFile(this.file, (res: any, filePath: string) => {
      this.localFilePath = filePath;
      this.pdfViewer.openDocument(res);
      this.dialogService.dismiss();
      // 全屏点击时间
      setTimeout(()=>{
        this.pdfViewer.zoomFullPage()
      },500)
    });
  }
  openByApp() {
    this.fileService.openByApp(this.file, (res: any, filePath: string) => {
      this.localFilePath = filePath;
    });
  }
}
