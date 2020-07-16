import {Component, OnInit, ViewChild} from '@angular/core';
import $ from 'jquery';
import {FileService} from '../service/FileService';
import { SimplePdfViewerComponent, SimplePDFBookmark } from 'simple-pdf-viewer';
@Component({
  selector: 'app-pdf-viewer-page',
  templateUrl: './pdf-viewer-page.component.html',
  styleUrls: ['./pdf-viewer-page.component.scss'],
})
export class PdfViewerPageComponent implements OnInit {
    public url = '';

  @ViewChild(SimplePdfViewerComponent) public pdfViewer: SimplePdfViewerComponent;
  constructor(
      public fileService: FileService
  ) { }




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
      $.get('http://192.168.0.108:8098/api/v2/pdf/changpdf?fileid=f133ab79-3b01-405b-8c3f-1f4f9f14576c', (res) => {
        console.log(res.data);
        alert('开始下载');
        this.fileService.downloadFile(res.data, (res: any) => {
          this.pdfViewer.zoomFullPage();
          this.pdfViewer.openDocument(res);
        });
      });
    }, 2000);
  }
}
