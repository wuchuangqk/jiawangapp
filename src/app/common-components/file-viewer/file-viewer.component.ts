import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImgUploadProvider } from '../../service/img-upload';

@Component({
    selector: 'app-file-viewer',
    templateUrl: './file-viewer.component.html',
    styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit {
    public imgArr = [];
    public photo = '';
    public fileUrl: any = '';
    public fileArr = [];
    public files = [];
    public avatar: any;
    @Output() getFileArray = new EventEmitter();
    constructor(
        private imgUploadProvider: ImgUploadProvider,
    ) { }

    ngOnInit() {}
    public isImage(file) {
        if ((file.type).indexOf('image/') === -1) {
            return false;
        } else {
            return true;
        }
    }
    presentActionSheet() {
        this.imgUploadProvider.presentAction().then((fileArr: object[]) => {
            if (Object.prototype.toString.call(fileArr) === '[object Array]') {
                this.fileArr = this.fileArr.concat(fileArr);
                this.getFileArray.emit(this.fileArr);
                fileArr.forEach((file: any) => {
                    this.tran(file.file).then((res) => {
                        this.imgArr.push(res);
                    });
                });
            }
        });
    }
    getFileMimeType(fileType: string): string {
        let mimeType = '';

        switch (fileType) {
            case 'text/plain':
                mimeType = 'txt';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                mimeType = 'docx';
                break;
            case 'application/msword':
                mimeType = 'doc';

                break;
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                mimeType = 'pptx';
                break;
            case 'application/vnd.ms-powerpoint':
                mimeType = 'ppt';

                break;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                mimeType = 'xlsx';
                break;
            case 'application/vnd.ms-excel':
                mimeType = 'xls';
                break;
            case 'application/x-zip-compressed':
                mimeType = 'zip';
                break;
            case 'application/octet-stream':
                mimeType = 'rar';
                break;
            case 'application/pdf':
                mimeType = 'pdf';
                break;
            case 'image/jpeg':
                mimeType = 'jpg';
                break;
            case 'image/png':
                mimeType = 'png';
                break;
            default:
                mimeType = 'application/' + fileType;
                break;
        }
        return mimeType;
    }
    tran(file) {
        return new Promise((res, rej) => {
            const fileReader = new FileReader(); // 创建一个filereader对象
            const _THIS = this;
            fileReader.readAsDataURL(file);  // 读取所上传对的文件
            fileReader.onload = function() {
                if (_THIS.isImage(file)) {
                    res(this.result);
                } else {
                    const fileType = _THIS.getFileMimeType(file.type);
                    let img = '';
                    if (fileType === 'doc' || fileType === 'docx') {
                        img = 'word';
                    } else if (fileType === 'xls' || fileType === 'xlsx') {
                        img = 'excel';
                    } else if (fileType === 'ppt' || fileType === 'pptx') {
                        img = 'ppt';
                    } else {
                        img = 'other';
                    }
                    res(`assets/images/fileType/${img}.jpg`);
                }
            };
        });
    }
}
