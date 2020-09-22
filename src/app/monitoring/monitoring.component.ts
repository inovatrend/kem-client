import {Component, OnInit} from '@angular/core';
import {MonitoringService} from './monitoring.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {NgxSpinnerService} from 'ngx-spinner';
import {interval} from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
})
export class MonitoringComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.4,
    animation: {
      duration: 0
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: true
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'y'
        },
        zoom: {
          enabled: true,
          mode: 'y'
        }
      }
    }
  };

  public alertMessage: string;
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Lag'}
  ];

  constructor(public monitoringService: MonitoringService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  public loadData(): void {
    this.resetBarData();
    this.spinner.show();

    this.monitoringService.loadLag()
      .subscribe(respo => {
        if (respo.length > 0) {
          this.spinner.hide();
          respo.forEach(responseResult => {
            var topicNameAndTimestamp = new Date(responseResult.id).toLocaleString() + '-' + responseResult.topicName;

            this.barChartLabels.push(topicNameAndTimestamp);
            this.barChartData.forEach(result => {
              result.data.push(responseResult.lag);
            });
          });
        } else {
          interval(2500).subscribe(respo => {
            this.alertMessage = 'No data to show!';
          });

          interval(3000).subscribe(respo => {
            this.spinner.hide();
            this.alertMessage = '';
          });
        }
      });
  }

  private resetBarData() {
    this.barChartData = [
      {data: [], label: 'Lag'}
    ];
    this.barChartLabels = [];
  }
}
