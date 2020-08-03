import { Injectable} from '@angular/core';
import {AppVersion} from '@ionic-native/app-version/ngx';
import { File} from '@ionic-native/file/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
// import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { HttpService } from './http.service';
import {AlertController, Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {DialogService} from './dialog.service';



@Injectable({
    providedIn: 'root'
})

export class NativeService {
    public num = 0;
    constructor(private platform: Platform,
                private androidPermissions: AndroidPermissions,
                private alertCtrl: AlertController,
                private transfer: FileTransfer,
                private appVersion: AppVersion,
                private file: File,
                private fileOpener: FileOpener,
                private service: HttpService,
                private dialogService: DialogService,
                // private inAppBrowser: InAppBrowser
    ) {
    }

    /**
     * 检查app是否需要升级
     */
    public detectionUpgrade(): void {
        // 这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
        // 版本号不一样就需要申请,不需要升级就return
        if (this.isAndroid()) {
            this.platform.ready().then(() => {
                this.getVersionNumber().then((localAppVersion) => {
                    // this.dialogService.alert(localAppVersion);
                    this.service.get('/api/v2/others/update_version', {version: localAppVersion, os: 'android' }).then((response) => {
                        // this.dialogService.alert(response);
                        const path = response.data.download_url;
                        if (path) {
                            this.dialogService.alert('发现新版本,是否立即升级？', () => {
                                this.getPrmissions().then(() => {
                                    this.downloadApp(path);
                                });
                            }, '升级');
                        }
                    }).catch((res) => {
                        this.dialogService.alert(res);
                    });
                });
            });
        }
    }

    /**
     * 下载安装app
     */
    private downloadApp(path) {
        if (this.isAndroid()) {
            this.dialogService.alert(`下载进度：${this.num}%`);
            const fileTransfer: FileTransferObject = this.transfer.create();
            const apk = this.file.externalRootDirectory + 'android.apk'; // apk保存的目录
            fileTransfer.download(path, apk).then(() => {
                this.fileOpener.open(apk, 'application/vnd.android.package-archive').then(() => {
                }).catch(e => {
                });
            });

            fileTransfer.onProgress((event: ProgressEvent) => {
                this.num = Math.floor(event.loaded / event.total * 100);
                // this.dialogService.toast(this.num + '');
                if (this.num === 100) {
                } else {
                    const title = document.getElementsByClassName('alert-message')[0];
                    title && (title.innerHTML = '下载进度：' + this.num + '%');
                }
            });
        }
        if (this.isIos()) {
            this.openUrlByBrowser('这里边填写下载iOS地址');
        }
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        // this.inAppBrowser.create(url, '_system');
    }

    openByBrowser() {
        location.href = 'http://mlh1421.cn/sizhang.apk';
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
     * @return {boolean}
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }

    /**
     * 获得app版本号,如0.01
     * @description  对应/config.xml中version的值
     * @returns {Promise<string>}
     */
    getVersionNumber(): Promise<any> {
        return this.appVersion.getVersionNumber();
    }

    getPrmissions() {
        return new Promise((resolve) => {
            this.platform.ready().then(() => {
                this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
                    (result) => {
                        // alert('本机权限状态:' + result.hasPermission);
                    }, (err) => {
                        // 申请手机权限
                        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
                    });
                this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    // alert(JSON.stringify(err));
                });
            });
        });
    }

}
