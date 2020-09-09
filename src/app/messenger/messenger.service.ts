import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KafkaMessageModel} from './model/KafkaMessageModel';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  public baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  public loadMessage(senderId: number, receiverId: number): Observable<KafkaMessageModel[]> {
    return this.http.get<KafkaMessageModel[]> ( this.baseUrl + '/messenger/receive/' + senderId + '/' + receiverId);
  }

  public sendMessage(kafkaMessage: KafkaMessageModel): Observable<KafkaMessageModel> {
    return this.http.post<KafkaMessageModel>(this.baseUrl + '/messenger/send', kafkaMessage);
  }
}
