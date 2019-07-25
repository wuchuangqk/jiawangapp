import { Injectable} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DialogService } from './dialog.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UtilService } from './util.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import {HttpService} from './http.service';
import { File as IFile } from '@ionic-native/file/ngx';
declare const ImagePicker;

@Injectable()
export class ImgUploadProvider {
    avatar = '';
    public fileUrl = '';
    private SECERET_KEY = 'com.yuangsong.102515';
    constructor(
        private camera: Camera,
        private alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public dialogService: DialogService,
        private  fileTransfer: FileTransfer,
        private fileChooser: FileChooser,
        private utilService: UtilService,
        private filePath: FilePath,
        private file: IFile,
    ) {

    }
    upload(filePath, uploadUrl, params?) {
        this.utilService.handleParams(params, this.SECERET_KEY);
        const options: FileUploadOptions = {
            fileKey: 'file',
            params,
        };

        const fileTransfer: FileTransferObject = this.fileTransfer.create();
        return fileTransfer.upload(filePath, uploadUrl, options);
    }
    async presentActionSheet(resolve?: Function) {
        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [{
                text: '拍照',
                role: 'takePhoto',
                handler: () => {
                    if (resolve) {
                        resolve('takePhoto');
                    }
                }
            },
            {
                text: '从相册选择',
                role: 'chooseFromAlbum',
                handler: () => {
                    if (resolve) {
                        resolve('chooseFromAlbum');
                    }
                }
            },
            {
                text: '选择文件',
                handler: () => {
                    if (resolve) {
                        resolve('chooseFile');
                    }
                }
            },
            {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    console.log('cancel');
                }
            }]
        });
        await actionSheet.present();
    }
    chooseFromAlbum() {
        const options = {
            maximumImagesCount: 1,
            quality: 100
        };
        return new Promise(((resolve, reject) => {
            ImagePicker.getPictures((result) => {
                resolve(result);
            }, (err) => {
                console.log(err);
            }, {
                maximumImagesCount : 9,
                width : 1920,
                height : 1440,
                quality : 100
            });
        }));
    }
    chooseFile() {
        return  this.fileChooser.open().then(url => {
            return  this.filePath.resolveNativePath(url);
        });
    }
    takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            allowEdit: true,
            saveToPhotoAlbum: true,
        };
        return this.camera.getPicture(options).then(image => {
            return image;
        }, error => {
            console.log('Error: ' + error);
        });
    }
    async getFile() {
        const filePath: any = await this.chooseFromAlbum();
        const imgArr = filePath.images;
        const fileArr: any = [];
        for (const item of imgArr) {
            const entry: any = await this.file.resolveLocalFilesystemUrl(item.uri);
            const file = await this.getf(entry);
            fileArr.push(file);
        }
        return fileArr;
    }
    async getf(entry) {
        return new Promise((resolve) => {
            entry.file(file => {

                const blob: Blob = file as Blob;
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imgBlob = new Blob([reader.result], {type: blob.type});
                    resolve({
                        file: imgBlob,
                        name: file.name
                    });
                };
                reader.readAsArrayBuffer(blob);
            });
        });
    }
    getChooseItem() {
        return new Promise(((resolve) => {
            this.presentActionSheet((res) => {
                resolve(res);
            });
        }));
    }
    async presentAction() {
        const res = await this.getChooseItem();
        if (res === 'takePhoto') {
            const filePath = await this.takePhoto();
            const entry: any = await this.file.resolveLocalFilesystemUrl(filePath);
            const file = await this.getf(entry);
            return [file];
        } else if (res === 'chooseFromAlbum') {
            return await this.getFile();
        } else if (res === 'chooseFile') {
            const fileTag: any = document.createElement('input');
            fileTag.type = 'file';
            fileTag.name = 'file';
            fileTag.style.display = 'none';
            document.body.appendChild(fileTag);
            const _THIS = this;
            return new Promise((resolve, reject) => {
                fileTag.onchange = function() {
                    const file = this.files[0];
                    const fileReader = new FileReader(); // 创建一个filereader对象
                    fileReader.readAsDataURL(file);  // 读取所上传对的文件
                    fileReader.onload = function() {
                        document.body.removeChild(fileTag);
                        resolve([{
                            file,
                            name: file.name
                        }]);
                    };

                };
                fileTag.click();
            });
        }
    }
}
