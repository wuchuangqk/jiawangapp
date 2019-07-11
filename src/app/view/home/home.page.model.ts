export class HomeModel {
    public static itemList = [
        { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice', title: '通知公告', url: '/notices/list', bage: '' },
        { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list'},
        { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '收文系统' },
        { icon: 'send', color: '#fa7c92', name: 'send-document', title: '发文系统' },
        { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'notice', title: '工作交流', url: '/work_dynamics/list' },
        { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '交办督办督查' },
        { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '请假审批' },
        { icon: 'ios-alarm', color: '#c1a6f0', name: 'overtime-work', title: '加班审批' },
        { icon: 'md-pin', color: '#a3bdb9', name: 'go-out', title: '外出审批' },
        { icon: 'logo-twitch', color: '#6cd7ff', name: 'synthesize', title: '综合审批' },
        { icon: 'ios-folder', color: '#6cd7ff', name: 'property', title: '资产购置' },
    ];
}
