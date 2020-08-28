import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {DialogService} from '../../../service/dialog.service';
import {BasePage} from '../../../base/base-page';
import echarts from 'echarts';

@Component({
  selector: 'app-hui-zong-tong-ji',
  templateUrl: './hui-zong-tong-ji.component.html',
  styleUrls: ['./hui-zong-tong-ji.component.scss'],
})
export class HuiZongTongJiComponent extends BasePage implements OnInit {
  index = 0;
  tableData: any = {};
  menuList: Array<object> = [
    {id: 0, name: '预备项目'},
    {id: 1, name: '前期项目'},
    {id: 2, name: '前期项目'},
    {id: 3, name: '前期项目'},
  ];
  public loading = false;
  constructor(
      public http: HttpService,
      public router: Router,
      public navController: NavController,
      public dialogService: DialogService,
      private elementRef: ElementRef,
      public route?: ActivatedRoute,
  ) {
    super(http, router, navController, dialogService);
  }
  ngOnInit() {
    this.getData();

  }
  setChart4(){
    // 月度
    this.request('/juece/projectInfo', {}).then((res) => {
      const  { data1, data2} = res.data;
      const myChart = echarts.init(document.getElementById('chart4'));
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: data1
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data2
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
  setChart5() {
    // 年度
    this.request('/juece/htinfo', {}).then((res) => {
      // 基于准备好的dom，初始化echarts实例
      const container = this.elementRef.nativeElement.querySelector('#chart5');
      const tmyChart = echarts.init(container);
      const  { data1, data2, data3} = res.data;
      const toption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: data1,
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: data1[0],
            type: 'bar',
            data: data2,
          },
          {
            name: data1[1],
            type: 'bar',
            data: data3,
          }

        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      tmyChart.setOption(toption);
    });
  }
  getData() {
    this.dialogService.loading();
    this.loading = true;
    this.request('/juece/index', {

    }).then((res) => {
      this.tableData = res.data;
      this.dialogService.dismiss();
      this.loading = false;
      this.setChart5();
      this.setChart4();
    });
  }

}
