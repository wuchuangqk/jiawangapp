import { Injectable } from '@angular/core';
import {AppVersion} from '@ionic-native/app-version/ngx';
import { File} from '@ionic-native/file/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { HttpService } from './http.service';
import {ActionSheetController, AlertController, NavController, Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {DialogService} from './dialog.service';
import { Base64 } from '@ionic-native/base64/ngx';
import {NativeService} from './NativeService';
import {Router} from "@angular/router";
// import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer/ngx";
@Injectable({
    providedIn: 'root',
})
export class FileService {
    public num = 0;
    public _file = {
        apk:    'application/vnd.android.package-archive',
        asf:    'video/x-ms-asf',
        avi:    'video/x-msvideo',
        bin:    'application/octet-stream',
        bmp:      'image/bmp',
        c:       'text/plain',
        conf:   'text/plain',
        cpp:   'text/plain',
        doc:    'application/msword',
        docx:    'application/msword',
        exe:   'application/octet-stream',
        gif:    'image/gif',
        gtar:    'application/x-gtar',
        gz:       'application/x-gzip',
        h:       'text/plain',
        htm:    'text/html',
        html:    'text/html',
        jar:   'application/java-archive',
        java:    'text/plain',
        jpeg:    'image/jpeg',
        JPEG:    'image/jpeg',
        jpg:   'image/jpeg',
        js:       'application/x-javascript',
        log:    'text/plain',
        m3u:    'audio/x-mpegurl',
        m4a:    'audio/mp4a-latm',
        m4b:    'audio/mp4a-latm',
        m4p:    'audio/mp4a-latm',
        m4u:    'video/vnd.mpegurl',
        m4v:    'video/x-m4v',
        mov:    'video/quicktime',
        mp2:    'audio/x-mpeg',
        mp3:    'audio/x-mpeg',
        mp4:    'video/mp4',
        mpc:    'application/vnd.mpohun.certificate',
        mpe:    'video/mpeg',
        mpeg:    'video/mpeg',
        mpg:    'video/mpeg',
        mpg4:    'video/mp4',
        mpga:    'audio/mpeg',
        msg:    'application/vnd.ms-outlook',
        ogg:    'audio/ogg',
        pdf:    'application/pdf',
        png:    'image/png',
        pps:    'application/vnd.ms-powerpoint',
        ppt:    'application/vnd.ms-powerpoint',
        pptx:    'application/vnd.ms-powerpoint',
        prop:    'text/plain',
        rar:    'application/x-rar-compressed',
        rc:        'text/plain',
        rmvb:    'audio/x-pn-realaudio',
        rtf:    'application/rtf',
        sh:        'text/plain',
        tar:    'application/x-tar',
        tgz:    'application/x-compressed',
        txt:    'text/plain',
        wav:    'audio/x-wav',
        wma:    'audio/x-ms-wma',
        wmv:    'audio/x-ms-wmv',
        wps:    'application/vnd.ms-works',
        xml:    'text/plain',
        z:        'application/x-compress',
        zip:    'application/zip'
    };
    constructor(private platform: Platform,
                private androidPermissions: AndroidPermissions,
                private alertCtrl: AlertController,
                private transfer: FileTransfer,
                private appVersion: AppVersion,
                private file: File,
                private fileOpener: FileOpener,
                private service: HttpService,
                public router: Router,
                // private navController:NavController,
                private dialogService: DialogService,
                public actionSheetCtrl: ActionSheetController,
                // private document: DocumentViewer,
                private nativeService: NativeService,
                private base64: Base64,
                // private inAppBrowser: InAppBrowser
    ) {
    }
    /**
     * 是否真机环境
     * @return {boolean}
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     * @return { boolean }
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }
    getFileMIMEType(ext): string {
        return this._file[ext];
    }



    private convertDataURIToBinary(dataURI) {
        const BASE64_MARKER = ';base64,';
        const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        const base64 = dataURI.substring(base64Index);
        const raw = window.atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }


    /**
     * 通过下载文件获取本地文件地址
     */
    public  async getFilePathByDownloadFile(file: IDownFile):Promise<string> {
        if (this.isAndroid()) {
            await this.nativeService.getPrmissions();
            const fileTransfer: FileTransferObject = this.transfer.create();
            // 本地文件路径
            const filePath = this.file.externalRootDirectory + file.filename + file.fileext; // apk保存的目录
            await fileTransfer.download(file.fileurl,  filePath)
            return filePath;
        }}


    async presentActionSheet(resolve?: Function) {

        if (resolve) {
            resolve('open');
        }
        // const actionSheet = await this.actionSheetCtrl.create({
        //     buttons: [{
        //         text: '通过外部程序打开',
        //         role: 'takePhoto',
        //         handler: () => {
        //             if (resolve) {
        //                 resolve('open');
        //             }
        //         }
        //     },
        //         // {
        //         //     text: '打开',
        //         //     // role: 'chooseFromAlbum',
        //         //     handler: () => {
        //         //         if (resolve) {
        //         //             resolve('open2');
        //         //         }
        //         //     }
        //         // },
        //         {
        //             text: '预览',
        //             handler: () => {
        //                 if (resolve) {
        //                     resolve('view');
        //                 }
        //             }
        //         },
        //         {
        //             text: '取消',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('cancel');
        //             }
        //         }]
        // });
        // await actionSheet.present();
    }
    nav(path, queryParams?) {
        return this.router.navigate([path], { queryParams});
    }
    /**
     * 文件下载
     */
   public  async downloadFile(file: IDownFile, backFn) {
       if (this.isAndroid()) {
           await this.nativeService.getPrmissions();
           const fileTransfer: FileTransferObject = this.transfer.create();
           // 本地文件路径
           const filePath = this.file.externalRootDirectory + file.filename + file.fileext; // apk保存的目录
           fileTransfer.download(file.fileurl,  filePath).then(() => {
                this.base64.encodeFile( filePath).then((base64File: string) => {
                    if (backFn) {
                        backFn(this.convertDataURIToBinary(base64File),  filePath);
                    }
                }, (err) => {
                    // alert('4' + err);
                });
            }).catch(e => {
                // alert('5' + JSON.stringify(e));
            });

       }}


    /**
     * 应用程序打开
     */
    public async openByApp(file: IDownFile, backFn) {
        await this.presentActionSheet((res)=>{
            console.log(res)
            if(res=='open'){
                if (this.isAndroid()) {
                    this.dialogService.loading("文件加载中");
                    const fileTransfer: FileTransferObject = this.transfer.create();
                    const filePath = this.file.externalRootDirectory + file.filename + file.fileext; // apk保存的目录
                    fileTransfer.download(file.fileurl, filePath).then(() => {
                        // const options: DocumentViewerOptions = {
                        //     title: file.filename
                        // }
                        // this.document.viewDocument(apk, 'application/pdf', options);
                        this.dialogService.dismiss();
                        this.fileOpener.open(filePath, this.getFileMIMEType(file.fileext.substring(1))).then(() => {}).catch(e => {});
                    });
                }
            }else if(res=='view'){
                this.nav('pdf',file)
            }
            // else if(res=='open2'){}
        })
    }

}

