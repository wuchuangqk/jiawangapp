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
    isPushStopped() {
        return this.jPush.isPushStopped();
    }
    resumePush() {
        return  this.isPushStopped().then((res) => {
            if (res == 1) {
                return this.jPush.resumePush();
            } else {

            }
        });
    }
    stopPush() {
        return this.jPush.stopPush();
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
        this.dialogService.alert(JSON.stringify(json));
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
        alert(type);
        this.dialogService.alert(contentTitle, () => {
            switch (type) {
                case 'message': {
                    this.nav('common_view', {
                        id,
                        title: itemTitle,
                        url: '/notices/list/',
                        contentTitle
                    });
                    break;
                }
                case 'article': {
                    this.nav('detail', {
                        id,
                        title: '收发文系统',
                        url: '/documents/slist',
                        contentTitle,
                        document_type: 0,
                        handle_status: 0,
                        handleUrl: '/documents/handle_document',
                    });
                    break;
                }
                case 'fwtip': {
                    this.nav('detail', {
                        id,
                        title: '发文系统',
                        url: '/documents/flist',
                        contentTitle,
                        document_type: 1,
                        handle_status: 1,
                        handleUrl: '/documents/handle_document',
                    });
                    break;
                }
                case 'swsh': {
                    this.nav('detail', {
                        id,
                        title: '收文系统',
                        url: '/documents/slist',
                        contentTitle,
                        isShenPi: true,
                        handle_status: 0,
                        document_type: 0,
                        handleUrl: '/documents/handle_document',
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
        }, itemTitle , '查看');
    }
}
