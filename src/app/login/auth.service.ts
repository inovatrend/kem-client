import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginModel} from './model/LoginModel';
import {Router} from '@angular/router';
import {UserModel} from '../register/model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.url;

  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loggedInUser: Observable<any> = this.loggedInUserSubject.asObservable();

  public error: string = null;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(loginModel: LoginModel) {
    const requestOptions: Object = {
      responseType: 'text',
      withCredentials: true
    };
    return this.http.post<any>(this.baseUrl + '/auth/login', loginModel, requestOptions)
      .subscribe(
        result => {
          if (loginModel.username !== 'admin') {
            this.router.navigate(['/messenger']);
          } else {
            this.router.navigate(['/monitoring']);
          }

          localStorage.setItem('token', result);
          this.error = null;
          return this.loggedInUserSubject.next(result);
        },
        error => {
          this.error = error.error;
          localStorage.clear();
        });
  }

  public getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrl + '/user/getAllUsers');
  }

  public getUserByUsername(username: string): Observable<UserModel> {
    const params = new HttpParams()
      .set('username', username);

    return this.http.get<UserModel>(this.baseUrl + '/user/getByUsername', {params: params});
  }

  public logout() {
    this.http.delete<UserModel>(this.baseUrl + '/auth/logout')
      .subscribe(resp => {
        this.loggedInUserSubject.next(resp);
        localStorage.clear();
        this.router.navigate(['/']);
      });
  }
}
