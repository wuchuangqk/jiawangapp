import { Component } from '@angular/core';

@Component({
  selector: 'app-home-tab',
  templateUrl: 'home-tab.component.html',
  styleUrls: ['home-tab.component.scss']
})
export class HomeTabComponent {

  public  itemList = [
    { icon: 'ios-notifications', color: '#7dc6ff', name: 'notice', title: '通知公告', url: '/notices/list', bage: '' , addUrl: 'add', isCanCommit: false },
    { icon: 'ios-bookmarks', color: '#7dc6ff', name: 'work-diary', title: '工作日志' , url: '/work_logs/list'},
    { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '待办事项' },
    { icon: 'ios-paper', color: '#73d1d1', name: 'receive-document', title: '待阅事项' },
    { icon: 'send', color: '#fa7c92', name: 'send-document', title: '融资管理' },
    { icon: 'ios-chatbubbles', color: '#7dc6ff', name: 'work-dynamics', title: '资产管理', url: '/work_dynamics/list', addUrl: 'exchange-add', isCanCommit: true },
    { icon: 'ios-people', color: '#fbbd6d', name: 'assign', title: '决策平台' },
    { icon: 'calendar', color: '#b2d76a', name: 'leave', title: '项目分布' },
  ];
  constructor() {}

}
