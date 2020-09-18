import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KafkaLagMonitoring} from '../messenger/model/KafkaLagMonitoring';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  public baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  public loadLag(): Observable<KafkaLagMonitoring[]> {
    return this.http.get<KafkaLagMonitoring[]> ( this.baseUrl + '/monitoring/lag');
  }
}
