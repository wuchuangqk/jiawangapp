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
    getRegistrationID(callback?: Function) {
        this.jPush.getRegistrationID().then((id) => {
            if (id.length > 0) {
               if (callback) {
                   callback(id);
               }
           } else {
                this.getRegistrationID();
            }
            // return id;
        });
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
        this.dialogService.alert(type);
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
                case 'sign': {
                    this.nav('SignDetailPage', {
                        id,
                        title: itemTitle
                    });
                    break;
                }

                case 'qingjiado': {// 请假审批
                    this.nav('/leave/approve', {
                        id,
                        title: itemTitle,
                        url: '/qingjia/shenpi_detail',
                        contentTitle,
                        handleUrl: '/qingjia/shenpi_save',
                    });
                    break;
                }
                case 'qingjiadofinish': {// 请假审批完成
                    this.nav('/leave/detail', {
                        id,
                        title: itemTitle,
                        url: '/qingjia/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'jiabando': {// 加班审批
                    this.nav('/overtime-work/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/jiaban/shenpi_detail',
                        handleUrl: '/jiaban/shenpi_save'
                    });
                    break;
                }

                case 'jiabandofinish': {// 请假审批完成
                    this.nav('/overtime-work/detail', {
                        id,
                        title: itemTitle,
                        url: '/jiaban/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'waichudo': {// 外出审批
                    this.nav('go-out/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/waichu/shenpi_detail',
                        handleUrl: '/waichu/shenpi_save',
                    });
                    break;
                }

                case 'waichudofinish': {// 外出审批完成
                    this.nav('/go-out/detail', {
                        id,
                        title: itemTitle,
                        url: '/waichu/shenpi_detail',
                        contentTitle,
                    });
                    break;
                }
                case 'zhspdo': {// 综合审批审批
                    this.nav('synthesize/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhsp/zhsp_detail',
                        handleUrl: '/zhsp/shenpi_save',
                    });
                    break;
                }

                case 'zhspdofinish': {// 综合审批审批完成
                    this.nav('synthesize/detail', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhsp/zhsp_detail',
                    });
                    break;
                }
                // 置产购置审批
                case 'zhigou': {
                    this.nav('property/approve', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhigou/zhigou_detail',
                        handleUrl: '/zhigou/shenpi_save',
                    });
                    break;
                }

                // 置产购置审批完成
                case 'zhigoufinish': {
                    this.nav('property/detail', {
                        id,
                        title: itemTitle,
                        contentTitle,
                        url: '/zhigou/zhigou_detail',
                    });
                    break;
                }
                // 文化宣传导航
                case 'wenxuan': {
                    this.nav('cultural-propaganda/detail', {
                        id,
                        title: '文化宣传详情',
                        contentTitle,
                        url: '/notices/wenxuan_detail',
                    });
                    break;
                }
                case 'letterdo': {
                    this.nav('detail', {
                        title: itemTitle,
                        url: '/letter/list/',
                        handleUrl: '/letter/handle_letter',
                        document_type: 1,
                        id,
                        handle_status: '1'
                    });
                    break;
                }

                case 'letterdofinish': {
                    this.nav('detail', {
                        title: itemTitle,
                        url: '/letter/list/',
                        handleUrl: '/letter/handle_letter',
                        document_type: 1,
                        id,
                        handle_status: '0'
                    });
                    break;
                }
            }
        }, itemTitle , '查看');
    }
}
