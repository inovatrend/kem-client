import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from './Shared/LoginModel';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.url;

  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public loggedInUser: Observable<any> = this.loggedInUserSubject.asObservable();

  public error: string = null;

  constructor(private http: HttpClient,
              private router: Router) {}

  login(loginModel: LoginModel) {
    const requestOptions: Object = {
      responseType: 'text',
      withCredentials: true
    };

    return this.http.post<any>(this.baseUrl + '/auth/login', loginModel, requestOptions)
      .subscribe(
        result => {
          this.router.navigate(['/messenger']);
          sessionStorage.setItem('token', result);
          this.error = null;
          return this.loggedInUserSubject.next(result);
        },
        error => {
          this.error = error.error;
          sessionStorage.clear();
        });
  }

  public logout () {
    sessionStorage.clear();
    this.loggedInUserSubject.next(null);
    this.router.navigate(["/"]);
  }
}
