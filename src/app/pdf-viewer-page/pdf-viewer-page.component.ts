import {Component, OnInit, ViewChild} from '@angular/core';
import $ from 'jquery';
import {FileService} from '../service/FileService';
import { SimplePdfViewerComponent, SimplePDFBookmark } from 'simple-pdf-viewer';
import {BasePage} from '../base/base-page';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, NavController} from '@ionic/angular';
import {DialogService} from '../service/dialog.service';
@Component({
  selector: 'app-pdf-viewer-page',
  templateUrl: './pdf-viewer-page.component.html',
  styleUrls: ['./pdf-viewer-page.component.scss'],
})
export class PdfViewerPageComponent extends BasePage implements OnInit {
    public url = '';
  public file: IDownFile;
  public localFilePath = '';
  @ViewChild(SimplePdfViewerComponent) public pdfViewer: SimplePdfViewerComponent;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private events: Events,
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
    setTimeout(() => {
      this.fileService.downloadFile(this.file, (res: any, filePath: string) => {
        this.localFilePath = filePath;
        this.pdfViewer.openDocument(res);
        this.pdfViewer.zoomFullPage();
      });
    }, 2000);
  }
  openByApp() {
    this.fileService.openByApp(this.file, (res: any, filePath: string) => {
      this.localFilePath = filePath;
    });
  }
}
