import {JPush} from '@jiguang-ionic/jpush/ngx';
import {Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Injectable} from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';

@Injectable({
    providedIn: 'root'
})
export class JPushModel {
    constructor(
        public jPush: JPush,
        public router: Router,
        public dialogService: DialogService,
        public badge: Badge,
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
    setDebugMode(enable: boolean): void {
        return this.jPush.setDebugMode(enable);
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
    public listenReceiveNotification() {
        /** 接收消息触发 */
        document.addEventListener('jpush.receiveNotification', (event: any) => {
            this.badge.increase(1);
        }, false);
    }

    public nav(path, queryParams?) {
        return this.router.navigate([path], { queryParams});
    }
    public goToPage( id, type, contentTitle, itemTitle ){
        // 是否返回到首页
        var isBackToHome = true;
        switch (type) {
            // htsc
            case 'htsc': {
                this.nav(`he-tong-shen-cha/detail`, {
                    // id,
                    // title: itemTitle,
                    // url: '/notices/list/',
                    // contentTitle,
                    id,
                    url:'/examine/tododetail',
                    title:itemTitle,
                    contentTitle:contentTitle,
                    handleUrl:'/examine/todosave',
                    isBackToHome

                });
                break;
            }
            case 'message': {
                this.nav(`common_view/${id}`, {
                    id,
                    title: itemTitle,
                    url: '/notices/list/',
                    contentTitle,
                    isBackToHome
                });
                break;
            }
            // 工作交流
            case 'trendofwork': {
                this.nav(`work-dynamics/exchange-view/${id}`, {
                    id,
                    title: itemTitle,
                    url: '/work_dynamics/list/',
                    contentTitle,
                    isBackToHome
                });
                break;
            }
            // 回到首页^
            case 'article': { // 收文办理
                this.nav('receive-document/receive-handle/'+id, {
                    id,
                    title: '收文系统',
                    url: '/receipt/anditdetail',
                    contentTitle,
                    document_type: 0,
                    handle_status: 1,
                    handleUrl: '/documents/handle_document',
                    isBackToHome
                });
                break;
            }
            // 发文待阅
            case 'DispatchSee': {
                this.nav('send-document/receive-handle/'+id, {
                    id,
                    title: '发文系统',
                    url: '/dispatch/tododetail',
                    contentTitle,
                    document_type: 1,
                    handle_status: 1,
                    handleUrl: '/documents/handle_document',
                    isBackToHome
                });
                break;
            }
            // 发文办理
            case 'fwtip': {
                this.nav('send-document/receive-handle/'+id, {
                    id,
                    title: '发文系统',
                    url: '/dispatch/tododetail',
                    contentTitle,
                    document_type: 1,
                    handle_status: 1,
                    handleUrl: '/documents/handle_document',
                    isBackToHome
                });
                break;
            }
            case 'ReceiptSee': { // 收文待阅
                this.nav('receive-document/receive-handle/'+id, {
                    id,
                    title: '收文系统',
                    url: '/receipt/anditdetail',
                    contentTitle,
                    isShenPi: false,
                    handle_status: 0,
                    document_type: 0,
                    handleUrl: '/documents/handle_document',
                    isBackToHome
                });
                break;
            }
            // 回到首页^
            case 'swsh': { // 收文审核，收文拟办
                this.nav('receive-document/receive-handle/'+id, {
                    id,
                    title: '收文系统',
                    url: '/receipt/anditdetail',
                    contentTitle,
                    isShenPi: true,
                    handle_status: 0,
                    document_type: 0,
                    handleUrl: '/documents/handle_document',
                    isBackToHome
                });
                break;
            }
            // 工程审批
            case 'sign': {
                this.nav('project/approve', {
                    id,
                    title: itemTitle,
                    handle_status:0,
                    isBackToHome
                });
                break;
            }

            case 'qingjiado': {// 请假管理
                this.nav('/leave/approve', {
                    id,
                    title: itemTitle,
                    url: '/qingjia/shenpi_detail',
                    contentTitle,
                    handleUrl: '/qingjia/shenpi_save',
                    isBackToHome
                });
                break;
            }
            case 'qingjiadofinish': {// 请假管理完成
                this.nav('/leave/detail', {
                    id,
                    title: itemTitle,
                    url: '/qingjia/shenpi_detail',
                    contentTitle,
                    isBackToHome
                });
                break;
            }
            case 'jiabando': {// 加班管理
                this.nav('/overtime-work/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/jiaban/shenpi_detail',
                    handleUrl: '/jiaban/shenpi_save',
                    isBackToHome
                });
                break;
            }
            case 'jiabandofinish': {// 请假管理完成
                this.nav('/overtime-work/detail', {
                    id,
                    title: itemTitle,
                    url: '/jiaban/shenpi_detail',
                    contentTitle,
                    isBackToHome
                });
                break;
            }
            case 'waichudo': {// 外出管理
                this.nav('go-out/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/waichu/shenpi_detail',
                    handleUrl: '/waichu/shenpi_save',
                    isBackToHome
                });
                break;
            }

            case 'waichudofinish': {// 外出管理完成
                this.nav('/go-out/detail', {
                    id,
                    title: itemTitle,
                    url: '/waichu/shenpi_detail',
                    contentTitle,
                    isBackToHome
                });
                break;
            }
            // 回到首页^
            case 'zhspdo': {// 综合管理管理
                this.nav('synthesize/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhsp/mydetail',
                    handleUrl: '/zhsp/todosave',
                    isBackToHome
                });
                break;
            }

            case 'zhspdofinish': {// 综合管理管理完成
                this.nav('synthesize/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhsp/zhsp_detail',
                    isBackToHome
                });
                break;
            }
            // 置产购置管理
            // 回到首页^
            case 'zhigou': {
                this.nav('property/approve', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhigou/zhigou_detail',
                    handleUrl: '/zhigou/shenpi_save',
                    isBackToHome
                });
                break;
            }

            // 置产购置管理完成
            case 'zhigoufinish': {
                this.nav('property/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/zhigou/zhigou_detail',
                    isBackToHome
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
                    isBackToHome
                });
                break;
            }
            // 报销管理管理完成
            case 'bxspdo': {
                this.nav('bao-xiao/approve', {
                    title: itemTitle,
                    url: '/baoxiao/zhsp_detail',
                    handleUrl: '/baoxiao/shenpi_save',
                    document_type: 1,
                    id,
                    handle_status: '1',
                    isBackToHome
                });
                break;
            }
            case 'bxspdofinish': {
                this.nav('bao-xiao/detail', {
                    id,
                    title: itemTitle,
                    contentTitle,
                    url: '/baoxiao/zhsp_detail',
                    isBackToHome
                });
                break;
            }

            // 交办督办
            case 'letterdo': {
                this.nav('assign/detail', {
                    title: itemTitle,
                    url: '/letter/list/',
                    handleUrl: '/letter/handle_letter',
                    document_type: 1,
                    id,
                    handle_status: '1',
                    isBackToHome
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
                    handle_status: '0',
                    isBackToHome
                });
                break;
            }
            //  回到首页^
            case 'zcsp': {
                this.nav('zi-chan/approve', {
                    title: itemTitle,
                    url: '/letter/list/',
                    handleUrl: '/letter/handle_letter',
                    document_type: 1,
                    id,
                    handle_status: '0',
                    isBackToHome
                });
                break;
            }



            //  回到首页^
            case 'rzspdo': { // 融资审批
                this.nav('rong-zi/sheng-pi-detail', {
                    title: itemTitle,
                    url: '/rongzi/tododetail',
                    handleUrl: '/rongzi/todosave',
                    document_type: 1,
                    id,
                    handle_status: '0',
                    isBackToHome
                });
                break;
            }


        }
    }
    public pushNav(id, type, contentTitle, itemTitle) {
        this.dialogService.alert(contentTitle, () => {
            this.goToPage(id, type, contentTitle, itemTitle);
        }, itemTitle , '查看');
    }
    handleAndroid(json) {
        this.badge.decrease(1);
        const itemTitle = json.extras.title;
        const contentTitle = json.extras['cn.jpush.android.ALERT'];
        const type = json.extras.type;
        const id = json.extras.id;
        this.pushNav(id, type, contentTitle, itemTitle);
    }
}
