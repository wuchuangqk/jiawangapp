import { Injectable} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DialogService } from './dialog.service';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UtilService } from './util.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import {HttpService} from './http.service';

@Injectable()
export class ImgUploadProvider {
  avatar = '';
  public fileUrl = '';
  private SECERET_KEY = 'com.yuangsong.102515';
  constructor(
    private camera: Camera,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public dialogService: DialogService,
    private  fileTransfer: FileTransfer,
    private fileChooser: FileChooser,
    private utilService: UtilService,
    private filePath: FilePath,
    private httpService: HttpService,
  ) {

  }
  upload(filePath, uploadUrl, params?) {
    this.utilService.handleParams(params, this.SECERET_KEY);
    this.dialogService.alert(JSON.stringify(params));
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
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 100
      // width: 200,
      // height: 200
    };
    return new Promise(((resolve, reject) => {
      this.imagePicker.getPictures(options).then(images => {
        if (images.length > 1) {
          reject('0');
        } else if (images.length === 1) {
          this.avatar = images[0].slice(7);
          resolve(this.avatar);
          // resolve(images[0].slice(7));
        }
      }, error => {
        reject('Error: ' + error);
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
      // targetWidth: 200,
      // targetHeight: 200,
      saveToPhotoAlbum: true,
    };
    return this.camera.getPicture(options).then(image => {
      // this.avatar = image.slice(7);
      // return this.avatar;
      return image.replace('file://', '');
    }, error => {
      console.log('Error: ' + error);
    });
  }
  presentAction() {
    // url = '/api/v2' + url;
    return new Promise(((resolve) => {
      this.presentActionSheet((res) => {
        if (res === 'takePhoto') {
          this.takePhoto().then((res) => {
              resolve(res);
          });
        } else if (res === 'chooseFromAlbum') {
          this.chooseFromAlbum().then((res) => {
            resolve(res);
          });
        } else if (res === 'chooseFile') {
          this.chooseFile().then((res) => {
            const url = res.slice(7);
            resolve(url);
          });
        }
      });
    }));
  }
  startUpload(url, data, fileUrl?) {
      if (fileUrl) {
        return  this.upload(fileUrl, this.httpService.BaseUrl + '/api/v2' + url, data);
      } else {
        return  this.httpService.post('/api/v2' + url, data);
      }
  }
  presentAlert() {
    this.dialogService.alert('只能选择一张图片作为头像哦', () => {}, '上传失败');
  }
}

