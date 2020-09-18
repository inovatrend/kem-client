import {Component, OnInit} from '@angular/core';
import {MonitoringService} from './monitoring.service';
import {KafkaLagMonitoring} from '../messenger/model/KafkaLagMonitoring';
import {interval} from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  // single: any[];
  // multi: any[];
  //
  // view: any[] = [700, 400];
  //
  // // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Country';
  // showYAxisLabel = true;
  // yAxisLabel = 'Population';
  //
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  //
  //
  public metrics: KafkaLagMonitoring [] =  [];

  constructor(public monitoringService: MonitoringService) {
  }

  ngOnInit(): void {


    let subscriptionInterval = interval(3000)
      .subscribe(respo => {
        this.monitoringService.loadLag()
          .subscribe(respo => {
            this.metrics = respo;
          });
      });
  }
  //
  // onSelect(event) {
  //   console.log(event);
  // }
}
