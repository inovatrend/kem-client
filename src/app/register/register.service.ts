import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from './model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public baseUrl = environment.url;

  constructor(private http: HttpClient) { }


  public saveUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel> ( this.baseUrl + '/user/save', user);
      }
  }

