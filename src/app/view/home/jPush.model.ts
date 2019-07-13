import {JPush} from '@jiguang-ionic/jpush/ngx';
import {Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JPushModel {
    constructor(
        public jPush: JPush,
        public router: Router,
        public dialogService: DialogService,
    ) {
    }
    init() {
        return this.jPush.init();
    }
    getPersonAlias() {
        const ua = JSON.parse(localStorage.userInfo);
        const alias = ua.pushid.replace(/-/g, '');
        return alias;
    }
    getRegistrationID() {
        return  this.jPush.getRegistrationID();
    }
    setAlias(alias) {
        return this.jPush.setAlias({ sequence: 100, alias});
    }
    public listenOpenNotification() {
        document.addEventListener('jpush.openNotification', onOpenNotification => {
            this.handleAndroid(onOpenNotification);
        }, false);
    }

    public nav(path, queryParams?) {
        return this.router.navigate([path], { queryParams});
    }
    handleAndroid(json) {
        console.log(JSON.stringify(json));
        const dialogMsg = json.alert;
        const itemTitle = json.extras.title;
        const contentTitle = json.extras['cn.jpush.android.ALERT'];
        const type = json.extras.type;
        const id = json.extras.id;
        let btnText = '';
        if (type === 'message') {
            btnText = '前往查看';
        } else {
            btnText = '确定';
        }
        this.dialogService.alert('aa', () => {
            switch (type) {
                case 'message': {
                    this.nav('CommonViewPage', {
                        id,
                        title: itemTitle,
                        url: '/notices/list/' + id,
                        contentTitle
                    });
                    break;
                }
                case 'article': {
                    this.nav('DetailPage', {
                        id,
                        title: '收发文系统',
                        url: '/documents/slist',
                        contentTitle,
                        document_type: 0,
                    });
                    break;
                }
                case 'fwtip': {
                    this.nav('DetailPage', {
                        id,
                        title: '发文系统',
                        url: '/documents/flist',
                        contentTitle,
                        document_type: 1,
                    });
                    break;
                }
                case 'swsh': {
                    this.nav('DetailPage', {
                        id,
                        title: '收文系统',
                        url: '/documents/slist',
                        contentTitle,
                        isShenPi: true,
                        document_type: 0,
                    });
                    break;
                }
                case 'sign':
                    this.nav('SignDetailPage', {
                        id,
                        title: itemTitle
                    });
                    break;
            }
        });
    }
}
