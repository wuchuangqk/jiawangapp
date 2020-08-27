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
// 融资台帐
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
  getYearArray() {
    const d = new Date();
    const yearArray = [];
    const thisYear = d.getFullYear();
    for (let i = 0; i <= 10; i++) {
      yearArray.push(thisYear + i);
    }
    return yearArray;
  }
  ngOnInit() {
    // 数据
    this.request('/rongzi/info', {}).then((res) => {
          this.taiZhangInfo = res.data;
    });
    // 月度
    this.request('/rongzi/monthhui', {}).then((res) => {
      const  { chart1, chart2, chart3} = res.data;
      const myChart = echarts.init(document.getElementById('chart1'));
      const option = {
        // title: {
        //   text: '单位（万元）'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['计划还款金额', '存单质押金额', '实际还款金额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '计划还款金额',
            type: 'bar',
            stack: '计划',
            data: chart1,
            itemStyle: {
              color: '#FFB800'
            }
          },

          {
            name: '实际还款金额',
            type: 'bar',
            stack: '融资',
            data: chart2,
            itemStyle: {
              color: '#FF0000'
            }
          },

          {
            name: '存单质押金额',
            type: 'bar',
            stack: '融资',
            data: chart3,
            itemStyle: {
              color: '#1E90FF'
            }
          }

        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
    // 年度
    this.request('/rongzi/yearhui', {}).then((res) => {
      // 基于准备好的dom，初始化echarts实例

      const  { chart1, chart2, chart3} = res.data;
      const tmyChart = echarts.init(document.getElementById('chart2'));
      const toption = {
        // title: {
        //   text: '单位（万元）'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['计划还款金额', '存单质押金额', '实际还款金额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.getYearArray()
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '计划还款金额',
            type: 'bar',
            stack: '计划',
            data: chart1,
            itemStyle: {
              color: '#FFB800'
            }
          },
          {
            name: '实际还款金额',
            type: 'bar',
            stack: '融资',
            data: chart2,
            itemStyle: {
              color: '#FF0000'
            }
          },

          {
            name: '存单质押金额',
            type: 'bar',
            stack: '融资',
            data: chart3,
            itemStyle: {
              color: '#1E90FF'
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      tmyChart.setOption(toption);
    });
  }

}
