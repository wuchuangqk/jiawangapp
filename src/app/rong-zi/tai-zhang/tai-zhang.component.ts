import { Component, OnInit } from '@angular/core';
import {BasePage} from '../../base/base-page';
import {HttpService} from '../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../service/dialog.service';
import {Events, NavController} from '@ionic/angular';
import echarts from 'echarts';
@Component({
  selector: 'app-tai-zhang',
  templateUrl: './tai-zhang.component.html',
  styleUrls: ['./tai-zhang.component.scss'],
})
export class TaiZhangComponent extends BasePage implements OnInit {
  public taiZhangInfo: any = {};
  constructor(
    public http: HttpService,
    public router: Router,
    public dialogService: DialogService,
    public events: Events,
    public navController: NavController,
    public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }

  ngOnInit() {
    // 数据
    this.request('/rongzi/info', {}).then((res) => {
          this.taiZhangInfo = res.data;
    });
    // 月度
    this.request('/rongzi/monthhui', {}).then((res) => {



            // 指定图表的配置项和数据
            const  option = {
              // 标题
              title: {
                text: '基础雷达图'
              },
              tooltip: {},
              legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
              },
              radar: {
                // shape: 'circle',
                name: {
                  textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                  }
                },
                indicator: [
                  { name: '销售（sales）', max: 6500},
                  { name: '管理（Administration）', max: 16000},
                  { name: '信息技术（Information Techology）', max: 30000},
                  { name: '客服（Customer Support）', max: 38000},
                  { name: '研发（Development）', max: 52000},
                  { name: '市场（Marketing）', max: 25000}
                ]
              },
              series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                  {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '预算分配（Allocated Budget）'
                  },
                  {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '实际开销（Actual Spending）'
                  }
                ]
              }]
            };
            // 获取dom容器
            // const myChart = echarts.init(document.getElementById('chart1'));
            // 使用刚指定的配置项和数据显示图表。
            // myChart.setOption(option);

    });
    // 年度
    this.request('/rongzi/yearhui', {}).then((res) => {

    });
  }

}
